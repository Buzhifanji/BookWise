import { DomSource } from "../interface";
import { ERROR } from "../util/err";
import { EventEmitter } from "./event-emitter";

export interface EventErrorData {
  type: ERROR
  detail?: DomSource
  error?: any
  [key: string]: any
}

interface EventHandlerErrMap {
  [key: string]: (...args: any[]) => void;
  error: (data: EventErrorData) => void;
}

class ErrorEventEmitter extends EventEmitter<EventHandlerErrMap> { }

export const errorEventEimtter = new ErrorEventEmitter()