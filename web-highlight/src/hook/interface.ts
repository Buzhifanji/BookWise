import { DomSource } from "../interface"
import { SelectNode } from "../paint/interface"
import { Hook } from "./hooks"

export interface HookMap {
  render: {
    UUID: Hook<string>
    selectNodes: Hook<SelectNode[]>
    wrapNode: Hook<HTMLElement>
  },
  record: {
    saveSource: Hook<DomSource>,
    removeSource: Hook<HTMLElement>
  }
}