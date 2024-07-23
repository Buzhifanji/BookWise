export class StorageAction {
  constructor(
    private key: string,
    private store: Storage,
    private isObject = true
  ) {}

  get() {
    const data = this.store.getItem(this.key)
    if (this.isObject) {
      if (data) {
        return JSON.parse(data)
      } else {
        return null
      }
    } else {
      return data
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
    this.store.removeItem(this.key)
  }
}
