import { Peer } from '../libs/peerjs/index.js'
import { getGameParam } from './functions.js'

export class ApplicationPeer extends Peer {
  connections = []

  ev = new EventTarget()

  constructor(id) {
    super(id)
    this.setEvents()
  }

  setEvents() {
    this.on('open', (open) => this.onPeerOpen(open))
    this.on('connection', (connection) => this.onPeerConnection(connection))
    this.on('error', (error) => this.onPeerError(error))
    this.on('close', (close) => this.onPeerClose(close))
  }

  onPeerOpen(open) {
    console.log('[game peer] open', open)
  }

  onPeerConnection(conn) {
    console.log('[game peer] connection', conn)

    this.connections.push(conn)

    conn.on('open', (open) => this.onConnOpen(conn, open))
  }

  onConnOpen(conn, open) {
    console.log('[conn] open', open, Date.now())

    conn.on('data', (data) => this.onConnData(conn, data))
    conn.on('error', (error) => this.onConnError(conn, error))
    conn.on('close', (close) => this.onConnClose(conn, close))
  }

  onConnData(conn, data) {
    console.log('[conn] data', conn.connectionId, data)
  }

  onConnError(conn, error) {
    console.log('[conn] error', conn.connectionId, error)
  }

  onConnClose(conn, close) {
    console.log('[conn] close', conn.connectionId, close)
  }

  onPeerError(error) {
    console.log('[game peer] error', error)
  }

  onPeerClose(close) {
    console.log('[game peer] close', close)
  }

  _sendMessage(name, body = {}) {
    const header = this.getMessageHeader(name)
    const json = { header, body }
    console.log('send message', { json })
    this.send(JSON.stringify(json))
  }

  getMessageHeader(name) {
    const player_id = this._id
    const game_id = getGameParam()
    const datetime = Date.now()

    return { name, player_id, game_id, datetime }
  }
}

export class GamePeer extends ApplicationPeer {
  players = []

  onConnOpen(conn, open) {
    super.onConnOpen(conn, open)
    this.addPlayer(conn)
    this.sendPlayerPosition(conn)
  }

  addPlayer(player) {
    this.players.push(player.connectionId)
    this.players = this.players.filter((p, ix) => ix < 4 && p._open)
  }

  sendPlayerPosition(conn) {
    const ix = this.players.findIndex((p) => conn.connectionId) + 1
    if (ix) conn.send(JSON.stringify({ header: {}, body: { ix } }))
  }

  onConnData(conn, data) {
    console.log('[conn] data', conn.connectionId, data)

    const json = JSON.parse(data)

    switch (json?.header?.name) {
      case 'player-sits-action': return this.onPlayerSits(conn, json)
    }
  }

  onPlayerSits(conn, data = {}) {
    console.log('[player] sits', conn, data)
    const { connectionId } = conn
    this.dispatch('player-sits', { connectionId })
  }

  dispatch(name, value = null) {
    const ev = new CustomEvent(name)
    if (value) ev.value = value
    this.ev.dispatchEvent(ev)
  }
}

export class PlayerPeer extends ApplicationPeer { }
