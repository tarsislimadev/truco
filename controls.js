import { HTML } from './libs/afrontend/index.js'
import { PlayerPeer } from './utils/peer.js'
import { TextElement } from './elements/text.element.js'
import { getGameParam } from './utils/functions.js'

export class Page extends HTML {
  player = new PlayerPeer()
  player_id = new HTML()

  onCreate() {
    super.onCreate()
    this.append(new TextElement({ text: 'Truco 2' }))
    this.append(new TextElement({ text: `Game ID: ` + getGameParam() }))
    this.append(this.player_id)
    this.setEvents()
  }

  setEvents() {
    this.player.on('open', (open) => {
      this.player_id.setText(`Player ID: ` + this.player._id)
    })
  }
}
