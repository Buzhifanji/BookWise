export type Position =
  | 'toast-start'
  | 'toast-center'
  | 'toast-end'
  | 'toast-top'
  | 'toast-middle'
  | 'toast-bottom'

export type AlertType =
  | 'alert-info'
  | 'alert-success'
  | 'alert-warning'
  | 'alert-error'
  | 'alert-primary'
  | 'alert-secondary'

export interface ToastOptions {
  position?: Position[]
  type?: AlertType
  message: string
  duration?: number
}
