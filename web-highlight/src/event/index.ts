import { isMobile as detectMobile } from '../util/is'
import { EventTypeEnum, UserInputEvent } from './enum'
import { EventErrorData, errorEventEimtter } from './err-event'
import { EventHandlerMap, InteractEvent, MouseOrTouchEvent } from './interface'

export { INTERNAL_ERROR_EVENT } from './const'
export { EventEmitter } from './event-emitter'
export { EventTypeEnum, errorEventEimtter }
export type { MouseOrTouchEvent, EventHandlerMap, EventErrorData }

export function getInteraction(): InteractEvent {
  const isMobile = detectMobile(window.navigator.userAgent)

  return {
    PointerEnd: isMobile ? UserInputEvent.touchend : UserInputEvent.mouseup,
    PointerTap: isMobile ? UserInputEvent.touchstart : UserInputEvent.click,
    // hover and click will be the same event in mobile
    PointerOver: isMobile ? UserInputEvent.touchstart : UserInputEvent.mouseover,
  }
}
