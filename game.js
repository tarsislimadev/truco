import { HTML } from './libs/afrontend/index.js'
import { TextElement } from './elements/text.element.js'
import { getGameId, getGameParam, getQRCodeImage } from './utils/functions.js'
import { GamePeer } from './utils/peer.js'

export class Page extends HTML {
  peer = new GamePeer(getGameId())

  onCreate() {
    super.onCreate()
    this.append(new TextElement({ text: 'Truco 2' }))
    this.append(new TextElement({ text: `Game: ID ` + getGameParam() }))
    this.append(getQRCodeImage())
  }
}
