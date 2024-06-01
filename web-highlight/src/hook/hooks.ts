import { INTERNAL_ERROR_EVENT, errorEventEimtter } from "../event";
import { indexOf, isIndexOf } from "../util/array";
import { ERROR } from "../util/err";

type HookCallback<T> = (...args: unknown[]) => T;

export class Hook<T = unknown> {
  name: string = ''

  private readonly cbs: HookCallback<T>[] = []

  constructor(name?: string) {
    if (name) {
      this.name = name
    }
  }

  tap(cb: HookCallback<T>) {
    if (!isIndexOf(this.cbs, cb)) {
      this.cbs.push(cb);
    }

    return () => this.remove(cb);
  }

  remove(cb: HookCallback<T>) {
    if (!isIndexOf(this.cbs, cb)) {
      return;
    }

    this.cbs.splice(indexOf(this.cbs, cb), 1);
  }

  isEmpty() {
    return this.cbs.length === 0;
  }

  call(...args: unknown[]) {
    const res: T[] = [];

    try {
      this.cbs.forEach(cb => {
        res.push(cb(...args));
      });
    } catch (err) {
      errorEventEimtter.emit(INTERNAL_ERROR_EVENT, {
        type: ERROR.HOOKS_TYPE_ERROR,
        error: `The ${this.name} hook callback is wrong when use it.`,
        hook: this
      })
    }

    return res;
  }
}