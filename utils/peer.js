import { Peer } from '../libs/peerjs/index.js'

export class GamePeer extends Peer {
  connections = []

  constructor(id) {
    super(id)
    this.setEvents()
  }

  setEvents() {
    this.on('open', (open) => this._onOpen(open))
    this.on('connection', (connection) => this._onConnection(connection))
    this.on('error', (error) => this._onError(error))
    this.on('close', (close) => this._onClose(close))
  }

  _onOpen(open) {
    console.log('[game peer] open', open)
  }

  _onConnection(conn) {
    console.log('[game peer] connection', conn)

    this.connections.push(conn)

    conn.on('open', (open) => this.onConnOpen(conn, open))
  }

  onConnOpen(conn, open) {
    console.log('[conn] open', open, Date.now())

    conn.on('data', (data) => this.onConnData(conn, data))
    conn.on('error', (error) => this.onConnError(conn, error))
    conn.on('close', (close) => this.onConnClose(conn, close))

    Array.from(this.connections).map((c) => c.send(JSON.stringify({})))
  }

  onConnData(conn, data) {
    console.log('[conn] data', conn.connectionId, data)

    const json = JSON.parse(data)

    switch (json?.header?.name) {
      case 'open': return this.onPlayerOpen(conn, json)
    }
  }

  onPlayerOpen(conn, data = {}) {
    console.log('[player] open', conn.connectionId, data)
  }

  onConnError(conn, error) {
    console.log('[conn] error', conn.connectionId, error)
  }

  onConnClose(conn, close) {
    console.log('[conn] close', conn.connectionId, close)
  }

  _onError(error) {
    console.log('[game peer] error', error)
  }

  _onClose(close) {
    console.log('[game peer] close', close)
  }
}
