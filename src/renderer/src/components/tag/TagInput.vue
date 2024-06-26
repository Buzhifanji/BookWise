<script setup lang="ts">
import { Tag } from '@renderer/batabase';
import { isInClientRectTop } from '@renderer/shared';
import { get, set, useThrottleFn } from '@vueuse/core';
import scrollIntoView from 'scroll-into-view-if-needed';
import { computed, defineProps, ref, watchEffect, withDefaults } from 'vue';
import TagListView from './TagList.vue';
import { TagAction } from './action';

interface Props {
  modelValue: Tag[],
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => [],
})

const emit = defineEmits(['update:modelValue'])

const container = ref<HTMLLabelElement | null>(null)
const listContianer = ref<HTMLUListElement | null>(null)
const list = ref(props.modelValue)
const tagValue = ref<string>('')
const allTag = TagAction.observable()

watchEffect(() => {
  set(list, props.modelValue)
})

// 候选列表
const placeholderOption = computed(() => {
  const val = get(tagValue)
  if (!val) return []

  const all = get(allTag) || []
  return all.filter(item => item.tagName.includes(val)).filter(item => !list.value.find(sub => sub.id === item.id))
})
const isTop = computed(() => {
  const dom = get(container)
  if (!dom) return false
  return isInClientRectTop(dom)
})
const activePlaceholder = ref(-1)

const onRemove = (index: number) => {
  list.value.splice(index, 1)
}

const reset = () => {
  set(tagValue, '')
  set(activePlaceholder, -1)
}

const addAction = (val: Tag) => {
  const isExist = list.value.find(item => item.id === val.id)
  if (!isExist) {
    list.value.push(val)
    emit('update:modelValue', list.value)
  }
  reset()
}

const onAdd = useThrottleFn(async () => {
  const index = get(activePlaceholder)
  if (index !== -1) {
    addAction(get(placeholderOption)[index])
    return
  }

  const val = get(tagValue).trim()
  if (val) {
    const all = get(allTag)
    const isExist = all.find(item => item.tagName === val)
    if (!isExist) {
      const res = await TagAction.add(val)
      if (res) {
        addAction(get(res))
      }
    } else {
      addAction(get(isExist))
    }
  }
}, 150)

const onPlaceholder = (val: Tag) => addAction(val)

const activeToView = () => {
  const node = get(listContianer)
  if (!node) return
  const { scrollHeight, clientHeight } = node
  if (scrollHeight <= clientHeight) return // 无滚动条

  const target = node.children[get(activePlaceholder)]?.firstElementChild
  if (!target) return
  scrollIntoView(target, { behavior: 'smooth', scrollMode: 'if-needed' })
}

const onDown = () => {
  const index = get(activePlaceholder)
  const len = get(placeholderOption).length
  if (index < len - 1) {
    set(activePlaceholder, index + 1)
    activeToView()
  }
}

const onUp = () => {
  const index = get(activePlaceholder)
  if (index <= 0) {
    set(activePlaceholder, 0)
  } else {
    set(activePlaceholder, index - 1)
  }
  activeToView()
}

const onTab = () => {
  const index = get(activePlaceholder)
  if (index !== -1) {
    addAction(get(placeholderOption)[index])
  }
}

</script>

<template>
  <ul v-if="isTop && placeholderOption.length" ref="listContianer"
    class="p-2 mt-2 z-[10] max-h-60 md:max-h-72 lg:max-h-96 w-full overflow-auto border border-accent  rounded-md menu flex-nowrap  bg-base-100 shadow-2xl  gap-1 scrollbar-thin">
    <li v-for="item, index in placeholderOption" :key="item.id" @click="onPlaceholder(item)" class="text-base-content">
      <a :class="{ active: activePlaceholder === index }">
        {{ item.tagName }}
      </a>
    </li>
  </ul>
  <label class="input input-bordered flex items-center gap-2 flex-wrap min-h-12 h-auto py-2" ref="container">
    <TagListView :tag="list" @remove="onRemove" />
    <input type="text" class="grow" v-model="tagValue" placeholder="请输入标签" @keydown.enter="onAdd()"
      @keydown.prevent.down="onDown()" @keydown.prevent.up="onUp()" @keydown.prevent.tab="onTab()" />
  </label>
  <ul v-if="!isTop && placeholderOption.length" ref="listContianer"
    class="p-2 mt-2 z-[10] max-h-60 md:max-h-72 lg:max-h-96 w-full overflow-auto border border-accent  rounded-md menu flex-nowrap  bg-base-100 shadow-2xl  gap-1 scrollbar-thin">
    <li v-for="item, index in placeholderOption" :key="item.id" @click="onPlaceholder(item)" class="text-base-content">
      <a :class="{ active: activePlaceholder === index }">
        {{ item.tagName }}
      </a>
    </li>
  </ul>
</template>