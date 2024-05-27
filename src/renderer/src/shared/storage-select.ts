interface Data {
  value: string
  id: string
}

type Callback = (value: Data) => void

/**
 * 本地存储选择器
 * @param key 本地存储的key
 * @param list 列表数据
 * @param updateCallback 更新回调
 */
export class StorageSelect {
  constructor(
    public key: string,
    public list: Data[],
    public updateCallback: Callback
  ) {}

  /**
   * 获取上次的值，如果本地缓存没有，则取defaultValue
   * @param defaultValue
   * @returns
   */
  getDefault = (defaultValue: Data) => {
    const { list, key } = this
    const cache = localStorage.getItem(key)
    let result = defaultValue
    if (cache) {
      for (const item of list) {
        if (item.value === cache) {
          result = item
          break
        }
      }
    }

    return result
  }

  /**
   * 更新数据
   * @param param0
   */
  set = (value: Data) => {
    localStorage.setItem(this.key, value.value)
    this.updateCallback(value)
  }

  /**
   * 初始化数据
   * @param defaultValue，如果本地缓存没有，则取defaultValue
   */
  init = (defaultValue: string) => {
    const value = localStorage.getItem(this.key) || defaultValue
    let data: Data | null = null
    for (const item of this.list) {
      if (item.value === value) {
        data = item
      }
    }

    if (data) {
      this.set(data)
    } else {
      throw new Error(`${value} is not in list`)
    }
  }
}
