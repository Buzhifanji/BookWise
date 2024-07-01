export enum Mode {
  single, // 单一模式，如果重叠了，取并集，并且data id 取最新的。
  reserve // 保留模式，如果重叠了，交集会保留旧的数据，旧的id作为extra信息，而新的id将替换data id。
}
