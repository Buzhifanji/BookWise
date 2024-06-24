const CHANNEL_CODE = 'book_wise_channel'

const channel = new BroadcastChannel(CHANNEL_CODE)

type Fn = (value: any) => void

export function listenChannel(fn: Fn) {
  channel.addEventListener('message', fn)
}

export function unlistenChannel(fn: Fn) {
  channel.removeEventListener('message', fn)
}

export function channelPostMessage<T>(value: T) {
  channel.postMessage(value)
}
