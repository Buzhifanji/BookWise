import { Toast } from '@renderer/components'

export function toastError(message: string) {
  Toast({
    message,
    position: ['toast-top', 'toast-center'],
    type: 'alert-error'
  })
}

export function toastSuccess(message: string) {
  Toast({
    message,
    position: ['toast-top', 'toast-center'],
    type: 'alert-success'
  })
}

export function toastWarning(message: string) {
  Toast({
    message,
    position: ['toast-top', 'toast-center'],
    type: 'alert-warning'
  })
}
