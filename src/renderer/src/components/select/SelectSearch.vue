<script setup lang="ts">
import { isInClientRectTop } from '@renderer/shared';
import { t } from '@renderer/view/setting';
import { vOnClickOutside } from '@vueuse/components';
import { get, set, useThrottleFn, useToggle } from '@vueuse/core';
import scrollIntoView from 'scroll-into-view-if-needed';
import { computed, defineProps, ref, watchEffect, withDefaults } from 'vue';

interface Item {
  id: string
  value: string
}

interface Props {
  modelValue: Item[] | Item, // 单个代表着单选，数组代表着多选
  data: Item[],
  add?: (val: string) => Promise<Item>
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  data: () => [],
  className: ''
})

console.log(props.data)

const emit = defineEmits(['update:modelValue', 'clear'])
const isMultiple = Array.isArray(props.modelValue) ? true : false
const allData = computed(() => props.data)
const container = ref<HTMLLabelElement | null>(null)
const list = ref(Array.isArray(props.modelValue) ? props.modelValue : props.modelValue ? [props.modelValue] : [])
const inputValue = ref<string>('')
const activePlaceholder = ref(-1)
const listContianer = ref<HTMLUListElement | null>(null)
const [show, setShow] = useToggle(false)
watchEffect(() => {
  if (isMultiple) {
    set(list, props.modelValue as Item[])
  }
})

watchEffect(() => {
  const val = get(inputValue)
  // 单选
  if (val && !isMultiple && val !== (props.modelValue as Item).value) {
    setShow(true)
  }

  // 多选
  if(val && isMultiple) {
    setShow(true)
  }
})
// 候选列表
const placeholderOption = computed(() => {
  const val = get(inputValue)
  if (!val) return []

  const all = get(allData) || []
  return all.filter(item => item.value.includes(val)).filter(item => !list.value.find(sub => sub.id === item.id))
})

const isTop = computed(() => {
  const dom = get(container)
  if (!dom) return false
  return isInClientRectTop(dom)
})

const reset = () => {
  set(inputValue, '')
  set(activePlaceholder, -1)
}

const addAction = (val: Item) => {
  const isExist = list.value.find(item => item.id === val.id)
  if (!isExist) {
    if (isMultiple) {
      list.value.push(val)
      emit('update:modelValue', list.value)
    } else {
      emit('update:modelValue', val)

      set(inputValue, val.value)
    }
  } else {
    if (!isMultiple) {
      set(inputValue, isExist.value)
    }
  }
  setShow(false)
  if (isMultiple) {
    reset()
  }

}

const onAdd = useThrottleFn(async () => {
  const val = get(inputValue).trim()
  if (!val) {
    emit('clear')
    return
  }

  const index = get(activePlaceholder)
  if (index !== -1) {
    addAction(get(placeholderOption)[index])
    return
  }


  const isExist = get(allData).find(item => item.value === val)
  if (!isExist) {
    if (props.add) {
      // 新增一个新的数据
      const res = await props.add(val)
      if (res) {
        addAction(res)
      }
    }

    if (!isMultiple) {
    }
  } else {
    addAction(isExist)
  }

}, 150)

const onPlaceholder = (val: Item) => addAction(val)
const onChoose = (i: number) => addAction(get(placeholderOption)[i])


function onDown() {
  const index = get(activePlaceholder)
  const len = get(list).length
  if (index < len - 1) {
    set(activePlaceholder, index + 1)
    activeToView()
  }
}

function onUp() {
  const index = get(activePlaceholder)
  if (index <= 0) {
    set(activePlaceholder, 0)
  } else {
    set(activePlaceholder, index - 1)
  }
  activeToView()
}

function onTab(cb: (value: number) => void) {
  const index = get(activePlaceholder)
  if (index !== -1) {
    cb(index)
  }
}

function activeToView() {
  const node = get(listContianer)
  if (!node) return
  const { scrollHeight, clientHeight } = node
  if (scrollHeight <= clientHeight) return // 无滚动条

  const target = node.children[get(activePlaceholder)]?.firstElementChild
  if (!target) return
  scrollIntoView(target, { behavior: 'smooth', scrollMode: 'if-needed' })
}

const onClose = () => setShow(false)
</script>

<template>
  <div class="relative" v-on-click-outside="onClose">
    <ul v-if="isTop && show && placeholderOption.length" ref="listContianer"
      class="p-2 mt-2 z-[10] max-h-60 md:max-h-72 lg:max-h-96 w-full overflow-auto border border-accent  rounded-md menu flex-nowrap  bg-base-100 shadow-2xl  gap-1 scrollbar-thin">
      <li v-for="item, index in placeholderOption" :key="item.id" @click="onPlaceholder(item)"
        class="text-base-content">
        <a :class="{ active: activePlaceholder === index }">
          {{ item.value }}
        </a>
      </li>
    </ul>
    <label class="input input-bordered flex items-center gap-2 " :class="className" ref="container">
      <slot></slot>
      <input type="text" class="grow" v-model="inputValue" :placeholder="t('tag.needTag')" @keydown.enter="onAdd()"
        @keydown.prevent.down="onDown()" @keydown.prevent.up="onUp()" @keydown.prevent.tab="onTab(onChoose)" />
    </label>
    <ul v-if="!isTop && show && placeholderOption.length" ref="listContianer"
      class="p-2 mt-2 z-[10] max-h-60 md:max-h-72 lg:max-h-96 w-full overflow-auto border border-accent  rounded-md menu flex-nowrap  bg-base-100 shadow-2xl  gap-1 scrollbar-thin">
      <li v-for="item, index in placeholderOption" :key="item.id" @click="onPlaceholder(item)"
        class="text-base-content">
        <a :class="{ active: activePlaceholder === index }">
          {{ item.value }}
        </a>
      </li>
    </ul>
  </div>
</template>