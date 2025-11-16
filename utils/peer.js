import { Peer } from '../libs/peerjs/index.js'

export class GamePeer extends Peer {
  constructor(id) {
    super(id)
    this.setEvents()
  }

  setEvents() {
    this.on('open', (open) => this._onOpen(open))
    this.on('message', (message) => this._onMessage(message))
    this.on('error', (error) => this._onError(error))
    this.on('close', (close) => this._onClose(close))
  }

  _onOpen(open) {
    console.log('[game peer] open', open)
  }

  _onMessage(message) {
    console.log('[game peer] message', message)
  }

  _onError(error) {
    console.log('[game peer] error', error)
  }

  _onClose(close) {
    console.log('[game peer] close', close)
  }
}
