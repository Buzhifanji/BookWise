import { DomSource } from '../interface'
import { CreateFrom, EventTypeEnum, UserInputEvent } from './enum'

export interface InteractEvent {
  PointerEnd: UserInputEvent
  PointerTap: UserInputEvent
  PointerOver: UserInputEvent
  PinterDb: UserInputEvent
}

export type MouseOrTouchEvent = MouseEvent | TouchEvent

export interface EventHandlerMap<T> {
  [key: string]: (...args: any[]) => void
  [EventTypeEnum.SOURCE]: (
    data: { source: DomSource[]; isPainted: boolean; removeIds: string[]; range: Range },
    h: T
  ) => void
  [EventTypeEnum.CLICK]: (
    data: { id?: string; target: HTMLElement; source?: DomSource[] },
    h: T,
    e: MouseOrTouchEvent
  ) => void
  [EventTypeEnum.HOVER]: (data: { id: string }, h: T, e: MouseOrTouchEvent) => void
  [EventTypeEnum.HOVER_OUT]: (data: { id: string }, h: T, e: MouseOrTouchEvent) => void
  [EventTypeEnum.CREATE]: (
    data: { id: string; sources: DomSource[]; type: CreateFrom; removeIds?: string[] },
    h: T
  ) => void
  [EventTypeEnum.REMOVE]: (data: { ids: string[] }, h: T) => void
}
