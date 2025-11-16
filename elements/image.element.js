import { Element } from './element.js'

export class ImageElement extends Element {
  constructor({ src } = {}) {
    super({})
    this.setSrc(src)
  }

  getTagName() { return 'img' }

  getName() { return 'image' }

  setSrc(src) {
    this.element.setAttribute('src', src)
    return this
  }
}
