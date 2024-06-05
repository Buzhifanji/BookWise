import { DomSource } from './interface'
import { isArray } from './util/array'

export class Store {
  private _data = new Map<string, DomSource[]>()

  save(id: string, source: DomSource[]) {
    this._data.set(id, source)

    // if (Array.isArray(source)) {
    //   this._data.set(id, source)
    // } else {
    //   const list = this._data.get(id) || []
    //   list.push(source)
    //   this._data.set(id, list)
    // }
  }

  get(id: string): DomSource[] | undefined {
    return this._data.get(id)
  }

  getAll(): DomSource[][] {
    const result: DomSource[][] = []

    this._data.forEach((item) => result.push(item))

    return result
  }

  remove(ids: string | string[]) {
    if (!isArray(ids)) {
      ids = [ids]
    }

    ids.forEach((id) => this._data.delete(id))
  }

  removeAll(): string[] {
    const result: string[] = []

    this._data.forEach((_, key) => result.push(key))

    this._data.clear()

    return result
  }
}
