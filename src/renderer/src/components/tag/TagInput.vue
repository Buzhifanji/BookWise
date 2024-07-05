<script setup lang="ts">
import { Tag } from '@renderer/batabase';
import { useTabList } from '@renderer/hooks';
import { isInClientRectTop } from '@renderer/shared';
import { t } from '@renderer/view/setting';
import { get, set, useThrottleFn } from '@vueuse/core';
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

const { onDown, onUp, onTab, activePlaceholder, listContianer } = useTabList(placeholderOption)


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
const onChoose = (i: number) => addAction(get(placeholderOption)[i])


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
    <input type="text" class="grow" v-model="tagValue" :placeholder="t('tag.needTag')" @keydown.enter="onAdd()"
      @keydown.prevent.down="onDown()" @keydown.prevent.up="onUp()" @keydown.prevent.tab="onTab(onChoose)" />
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