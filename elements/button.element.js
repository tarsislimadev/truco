import { Element } from './element.js'

export class ButtonElement extends Element {
  constructor({ click = (() => console.log('click')), children = [], styles = {}, attrs = {} } = {}) {
    super({ children, styles, attrs, events: { click } })
  }

  onCreate() { }
}
