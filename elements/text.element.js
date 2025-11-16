import { Element } from './element.js'

export class TextElement extends Element {
  constructor({ text } = {}) {
    super({})
    this.setText(text)
  }
}
