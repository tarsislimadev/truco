import { HTML } from './libs/afrontend/index.js'
import { Peer } from './libs/peerjs/index.js'

export class Page extends HTML {
  peer = new Peer()
  conn = null

  onCreate() {
    super.onCreate()
    this.createConnection()
    this.setText(`game: ${this.getGameId()}; player: ${this.getPlayerId()}`)
  }

  createConnection() {
    this.peer.on('open', (open) => {
      console.log('[peer] open', open)
      this.conn = this.peer.connect(this.getGameId())
      this.conn.on('open', (open) => this.onPlayerConnected(open))
      this.conn.on('data', (data) => this.onPlayerData(data))
    })
  }

  onPlayerConnected(open) {
    console.log('[conn] open', open, Date.now())
    this.sendMessage('open', { open: true })
  }

  onPlayerData(data) {
    console.log('[player] data', data)
  }

  sendMessage(name, message = {}) {
    const json = {
      header: this.getMessageHeader(name),
      body: message
    }
    console.log('send message', { json })
    this.conn.send(JSON.stringify(json))
  }

  getGameId() {
    const id = this.getGameParam()
    return ['truco2', id].join('-')
  }

  getGameParam() {
    const url = new URL(window.location)
    return url.searchParams.get('game_id')
  }

  getPlayerId() { return this.peer._id }

  getMessageHeader(name) {
    return {
      name,
      datetime: Date.now(),
      game_id: this.getGameParam(),
      player_id: this.getPlayerId(),
    }
  }
}
