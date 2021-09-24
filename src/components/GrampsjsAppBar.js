/*
The dropdown menu for adding objects in the top app bar
*/

import {html, css, LitElement} from 'lit'
import {classMap} from 'lit/directives/class-map.js'
import '@material/mwc-top-app-bar'
import '@material/mwc-icon-button'
import '@material/mwc-icon'

import './GrampsjsAddMenu.js'

import {fireEvent} from '../util.js'
import {sharedStyles} from '../SharedStyles.js'

class GrampsjsAppBar extends LitElement {
  static get styles () {
    return [
      sharedStyles,
      css`
      mwc-top-app-bar {
        --mdc-typography-headline6-font-family: Roboto Slab;
        --mdc-typography-headline6-font-weight: 400;
        --mdc-typography-headline6-font-size: 19px;
      }

      mwc-top-app-bar.edit {
        --mdc-theme-primary: var(--mdc-theme-secondary);
        --mdc-theme-on-primary: var(--mdc-theme-on-secondary);
      }
      `
    ]
  }

  static get properties () {
    return {
      add: {type: Boolean},
      editMode: {type: Boolean},
      editTitle: {type: String},
      strings: {type: Object}
    }
  }

  constructor () {
    super()
    this.add = false
    this.editMode = false
    this.editTitle = ''
    this.strings = {}
  }

  render () {
    return html`
    <mwc-top-app-bar class="${classMap({edit: this.editMode})}">
    ${this.editMode
    ? html`<mwc-icon-button slot="navigationIcon" icon="close" @click="${this._handleCloseIcon}"></mwc-icon-button>`
    : html`<mwc-icon-button slot="navigationIcon" icon="menu" @click="${this._toggleDrawer}"></mwc-icon-button>`
}
    <div id="app-title" slot="title">${
  this.editMode && this.editTitle
    ? this.editTitle
    : (this._dbInfo?.database?.name || 'Gramps.js')
}
    </div>
    ${
  this.editMode
    ? ''
    : html`
    ${this.add
    ? html`
        <grampsjs-add-menu slot="actionItems" .strings="${this.strings}"></grampsjs-add-menu>
      `
    : ''}
      <mwc-icon-button icon="account_circle" slot="actionItems" @click="${() => this._handleNav('settings')}"></mwc-icon-button>
    <mwc-icon-button icon="search" slot="actionItems" @click="${() => this._handleNav('search')}"></mwc-icon-button>
    `}
  </mwc-top-app-bar>

`
  }

  _toggleDrawer () {
    fireEvent(this, 'drawer:toggle')
  }

  _handleNav (path) {
    fireEvent(this, 'nav', {path: path})
  }

  _handleCloseIcon () {
    fireEvent(this, 'edit-mode:off', {})
  }

  _disableEditMode () {
    this.editMode = false
  }

  _enableEditMode (e) {
    this.editMode = true
    this.editTitle = e.detail.title
  }

  connectedCallback () {
    super.connectedCallback()
    window.addEventListener('edit-mode:on', (e) => this._enableEditMode(e))
    window.addEventListener('edit-mode:off', (e) => this._disableEditMode(e))
  }

  _ (s) {
    if (s in this.strings) {
      return this.strings[s]
    }
    return s
  }
}

window.customElements.define('grampsjs-app-bar', GrampsjsAppBar)