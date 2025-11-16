import { HTML } from './libs/afrontend/index.js'
import { ImageElement } from './elements/image.element.js'
import { TextElement } from './elements/text.element.js'
import { LinkElement } from './elements/link.element.js'
import { qrcode } from './utils/functions.js'
import { GamePeer } from './utils/peer.js'

class SuperPage extends HTML {
  onCreate() {
    super.onCreate()
    this.append(new TextElement({ text: 'Truco 2' }))
  }
}

export class Page extends SuperPage {
  peer = new GamePeer(this.getGameId())

  onCreate() {
    super.onCreate()
    this.setEvents()
    this.append(this.getQRCodeImage())
  }

  setEvents() {
    this.peer.on('open', (open) => console.log('[peer] open', open, Date.now()))
    this.peer.on('connection', (connection) => console.log('[peer] connection', connection, Date.now()))
  }

  getQRCodeImage(url = this.getPlayerURL()) {
    const image = new ImageElement({ src: qrcode(url) })
    return new LinkElement({ href: url, children: [image] })
  }

  getPlayerURL(url = new URL(window.location)) {
    url.pathname = 'controls.html'
    url.searchParams.set('game_id', this.getGameParam())
    return url.toString()
  }

  getGameId() {
    const id = this.getGameParam()
    return ['truco2', id].join('-')
  }

  getGameParam() {
    const url = new URL(window.location)
    return url.searchParams.get('game_id')
  }
}
