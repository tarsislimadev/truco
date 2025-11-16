import { HTML } from './libs/afrontend/index.js'
import { PlayerPeer } from './utils/peer.js'

export class Page extends HTML {
  player = new PlayerPeer()
}
