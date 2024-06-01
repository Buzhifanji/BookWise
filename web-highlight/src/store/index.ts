import { DomSource } from "../interface";
import { isArray } from "../util/array";

export class Store {
  private _data = new Map<string, DomSource>();

  save(source: DomSource | DomSource[]): string | string[] {
    if (Array.isArray(source)) {
      const ids: string[] = [];

      source.forEach((item) => ids.push(this._saveOne(item)));

      return ids;
    } else {
      return this._saveOne(source);
    }
  }

  get(id: string): DomSource | undefined {
    return this._data.get(id);
  }

  getAll(): DomSource[] {
    const result: DomSource[] = []

    this._data.forEach(item => result.push(item))

    return result
  }

  remove(ids: string | string[]) {
    if (!isArray(ids)) {
      ids = [ids]
    }

    ids.forEach(id => this._data.delete(id))
  }

  removeAll(): string[] {
    const result: string[] = []

    this._data.forEach(({ id }) => result.push(id))

    this._data.clear()

    return result
  }

  private _saveOne(source: DomSource): string {
    this._data.set(source.id, source);

    return source.id;
  }
}
