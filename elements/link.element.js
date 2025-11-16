import { Element } from './element.js'

export class LinkElement extends Element {
  constructor({ children = [], href = '', styles = {} } = {}) {
    super({ children, styles, attrs: { href } })
  }

  getTagName() { return 'a' }

  getName() { return 'link' }
}
