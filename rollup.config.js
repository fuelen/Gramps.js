import merge from 'deepmerge'
import copy from 'rollup-plugin-copy'
import {createSpaConfig} from '@open-wc/building-rollup'
import replace from '@rollup/plugin-replace'

const API_URL = (process.env.API_URL === undefined)
  ? ''
  : process.env.API_URL

const BASE_DIR = (process.env.BASE_DIR === undefined)
  ? ''
  : process.env.BASE_DIR

const baseConfig = createSpaConfig({
  developmentMode: process.env.ROLLUP_WATCH === 'true',
  injectServiceWorker: true,
  workbox: {
    navigateFallbackDenylist: [/^\/api.*/],
    skipWaiting: false,
    clientsClaim: false
  },
  html: {
    transform: [
      (html) =>
        html.replace(
          '<base href="/">',
          `<base href="${BASE_DIR}/">`
        )
    ]
  }
})

export default merge(baseConfig, {
  input: './index.html',
  plugins: [
    copy({
      targets: [
        {src: './leaflet.css', dest: 'dist/'},
        {src: './manifest.json', dest: 'dist/'},
        {src: './images/**/*', dest: 'dist/images'},
        {
          src: 'node_modules/@hpcc-js/wasm/dist/graphvizlib.wasm',
          dest: 'dist/'
        },
        {
          src: 'node_modules/@hpcc-js/wasm/dist/graphvizlib.wasm',
          dest: 'dist/@hpcc-js/wasm'
        },
        {
          src: 'node_modules/@hpcc-js/wasm/dist/index.min.js',
          dest: 'dist/@hpcc-js/wasm'
        }
      ]
    }),
    replace({
      'http://localhost:5555': API_URL,
      BASE_DIR: JSON.stringify(BASE_DIR),
      preventAssignment: true
    })
  ]
})
