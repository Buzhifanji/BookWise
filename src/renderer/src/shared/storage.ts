export class StorageAction {
  constructor(
    private key: string,
    private store: Storage,
    private isObject = true
  ) {}

  get() {
    if (this.isObject) {
      return JSON.parse(this.store.getItem(this.key) || '{}')
    } else {
      return this.store.getItem(this.key)
    }
  }

  set(value: any) {
    if (this.isObject) {
      this.store.setItem(this.key, JSON.stringify(value))
    } else {
      this.store.setItem(this.key, value)
    }
  }

  clear() {
    this.store.clear()
  }
}
