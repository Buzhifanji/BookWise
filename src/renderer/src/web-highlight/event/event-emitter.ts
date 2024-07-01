
type EventHandler = (...data: unknown[]) => void;

type EventMap = Record<string, EventHandler>;
type HandlersMap<T extends EventMap> = {
  [K in keyof T]: T[K][];
};

export class EventEmitter<U extends EventMap = EventMap> {
  private _events: HandlersMap<U> = Object.create(null);

  on<T extends keyof U>(type: T, handler: U[T]) {
    if (!this._events[type]) {
      this._events[type] = [];
    }

    const has = this._events[type].find(item => item === handler)

    if (!has) {
      this._events[type].push(handler);
    }

    return this;
  }

  off<T extends keyof U>(type: T, handler: U[T]) {
    if (this._events[type]) {
      this._events[type].splice(this._events[type].indexOf(handler) >>> 0, 1);
    }

    return this;
  }

  offAll() {
    this._events = Object.create(null);
  }

  emit<T extends keyof U>(type: T, ...data: Parameters<U[T]>) {
    if (this._events[type]) {
      this._events[type].forEach(handler => {
        handler(...data);
      });
    }

    return this;
  }
}