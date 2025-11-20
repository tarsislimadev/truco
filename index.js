import { HTML, nButton } from './libs/afrontend/index.js'

export class Page extends HTML {
  onCreate() {
    super.onCreate()
    this.append(this.getLatestGamesListComponent())
    this.append(this.getNewgameButtonComponent())
  }

  getLatestGamesListComponent() {
    return new HTML()
  }

  getNewgameButtonComponent() {
    const button = new nButton()
    button.addEventListener('click', () => window.location = `/game.html?game_id=${button.getData('game_id')}`)
    button.setText('New Game')
    setInterval(() => button.setData('game_id', Date.now()), 100)
    return button
  }
}
