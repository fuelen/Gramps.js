import { html } from 'lit-element';

import { GrampsjsViewObject } from './GrampsjsViewObject.js'
import '../components/GrampsjsSource.js'


export class GrampsjsViewSource extends GrampsjsViewObject {


  getUrl() {
    return `/api/sources/?gramps_id=${this.grampsId}&profile=all&backlinks=true&extend=all`
  }

  renderElement() {
    return html`
    <grampsjs-source .data=${this._data} .strings=${this.strings}></grampsjs-source>
    `
  }

}


window.customElements.define('grampsjs-view-source', GrampsjsViewSource)
