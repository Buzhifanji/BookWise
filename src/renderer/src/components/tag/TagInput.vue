<script setup lang="ts">
import { Tag } from '@renderer/batabase';
import { t } from '@renderer/data';
import { get } from '@vueuse/core';
import { computed, defineProps, withDefaults } from 'vue';
import SelectSearchView from '../select/SelectSearch.vue';
import TagListView from './TagList.vue';
import { TagAction } from './action';
import { TagItem } from './type';

interface Props {
  modelValue: Tag[],
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => [],
})

const emit = defineEmits(['update:modelValue'])

const allTag = TagAction.observable()
const handleTag = (val: Tag[]) => val.map(item => ({ id: item.id, value: item.tagName }))
const toTag = (val: TagItem[]) => val.map(item => get(allTag).find(sub => sub.id === item.id))
const tags = computed(() => handleTag(get(allTag) || []))
const selectTag = computed(() => handleTag(props.modelValue))
const updateTag = (val: TagItem[]) => emit('update:modelValue', toTag([...val]))


const addTag = async (val: string) => {
  const res = await TagAction.add(val)

  if (res) {
    const isExist = get(selectTag).find(item => item.value === val)
    if (!isExist) {
      const data = { id: res.id, value: res.tagName }
      updateTag([...get(selectTag), data])
      return data
    }
  }
  return { id: '', value: '' }
}

const removeTag = (i: number) => {
  const data = [...get(selectTag)]
  data.splice(i, 1)
  emit('update:modelValue', toTag(data))
}

</script>

<template>
  <SelectSearchView :modelValue="selectTag" :placeholder="t('tag.needTag')" :add="addTag" @update:modelValue="updateTag"
    :data="tags">
    <TagListView :tag="selectTag" @remove="removeTag" />
  </SelectSearchView>
</template>