import { HTML } from '../libs/afrontend/index.js'

export class Element extends HTML {
  constructor({ children = [], styles = {}, attrs = {}, events = {} } = {}) {
    super()
    Array.from(children).map((c) => this.append(c))
    Object.keys(styles).map((s) => this.setStyle(s, styles[s]))
    Object.keys(attrs).map((a) => this.element.setAttribute(a, attrs[a]))
    Object.keys(events).map((e) => this.element.addEventListener(e, events[e]))
  }
}
