import { ImageElement } from '../elements/image.element.js'
import { LinkElement } from '../elements/link.element.js'

export const qrcode = (data = window.location.toString(), size = '150x150') => `https://api.qrserver.com/v1/create-qr-code/?size=${size}&data=${data}`

export const getGameId = () => {
  const id = getGameParam()
  return ['truco2', id].join('-')
}

export const getGameParam = () => {
  const url = new URL(window.location)
  return url.searchParams.get('game_id')
}

export const getControlsURL = (url = new URL(window.location)) => {
  url.pathname = 'controls.html'
  url.searchParams.set('game_id', getGameParam())
  return url.toString()
}

export const getQRCodeImage = (url = getControlsURL()) => {
  const image = new ImageElement({ src: qrcode(url) })
  return new LinkElement({ href: url, children: [image] })
}

export const getPeerConfig = () => ({
  // config: {
  //   'iceServers': [
  //     { 'url': 'stun:stun.l.google.com:19302' },
  //     { 'url': 'stun:stun1.l.google.com:19302' },
  //     { 'url': 'stun:stun2.l.google.com:19302' },
  //     { 'url': 'stun:stun3.l.google.com:19302' },
  //     { 'url': 'stun:stun4.l.google.com:19302' },
  //   ]
  // }
})
