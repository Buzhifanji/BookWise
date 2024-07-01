import { DomSource } from '../interface'
import { Hook } from './hooks'

interface SelectNode {
  node: Node
}

export interface HookMap {
  render: {
    UUID: Hook<string>
    selectNodes: Hook<SelectNode[]>
    wrapNode: Hook<HTMLElement>
  }
  record: {
    saveSource: Hook<DomSource>
    removeSource: Hook<HTMLElement>
  }
}
