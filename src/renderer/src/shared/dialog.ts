import { createApp } from 'vue'
import { $, createElement } from './dom'

const store = new WeakMap()

export function createDialog(component: any, value: any) {
  const app = createApp(component, value)
  let container = $('.dialog-container')
  if (container) {
    const oldApp = store.get(container)
    if (oldApp) {
      oldApp.unmount()
    }
  } else {
    container = createElement('div')
    container.className = 'dialog-container'
    document.body.appendChild(container)
  }

  app.mount(container)

  store.set(container, app)
}
