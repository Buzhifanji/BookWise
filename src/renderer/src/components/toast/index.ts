import { $, createElement } from '@renderer/shared'
import { Position, ToastOptions } from './type'

let id = 0

function createToastConatiner(position: Position[]) {
  const className = (position.length > 0 ? '.toast.' : '.toast') + position.join('.')
  const conatiner = $(className)
  if (conatiner) {
    return conatiner
  }

  const div = createElement('div')
  div.className = 'toast text-[16px] ' + position.join(' ')
  div.style.zIndex = '100000'
  document.body.appendChild(div)

  return div
}

function createAlert(type: string, id: string) {
  const alert = createElement('div')
  alert.className = 'alert ' + type + ' rounded-md px-[0.5rem] py-[0.75rem]'
  alert.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
  alert.id = id
  return alert
}

function createMessage(message: string) {
  const span = createElement('span')
  span.innerText = message
  return span
}

function createCloseButton(id: string) {
  const button = createElement('button')
  button.className = 'btn btn-circle btn-xs'
  button.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-xicon "><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>'
  button.addEventListener('click', () => {
    remove(id)
  })
  return button
}

function remove(id: string) {
  const toast = $(`#${id}`)
  if (toast) {
    toast.remove()
  }
}

export function Toast({ position, type, message, duration }: ToastOptions) {
  id += 1

  const toastId = `toast-${id}`

  const conatiner = createToastConatiner(position || [])
  const alert = createAlert(type || 'alert-info', toastId)
  const messageElement = createMessage(message || '')
  const closeButton = createCloseButton(toastId)

  alert.appendChild(messageElement)
  alert.appendChild(closeButton)
  conatiner.appendChild(alert)

  const removeAction = () => remove(toastId)

  if (duration !== null) {
    const time = duration || 3000
    setTimeout(removeAction, time)
  }

  return removeAction
}
