import { last } from "../util/array";
import { Hook } from "./hooks";
import { HookMap } from "./interface";

export function getHooks(): HookMap {
  return {
    render: {
      UUID: new Hook('Render.UUID'),
      selectNodes: new Hook('Render.selectNodes'),
      wrapNode: new Hook('Render.wrapNode'),
    },
    record: {
      saveSource: new Hook('Source.save'),
      removeSource: new Hook('Source.remove')
    }
  }
}

export function handleHookCall<T>(value: T, hook: Hook<T>, id: string, wrongValue: T) {
  let result = value

  if (!hook.isEmpty()) {
    const res = hook.call(id, value)
    result = last(res) || wrongValue
  }

  return result
}

export { Hook };
export type { HookMap };
