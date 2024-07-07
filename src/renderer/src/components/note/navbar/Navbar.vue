<script setup lang="ts">
import { changNavbarStore, noteNavbarStore, useFilterNoteStore } from '@renderer/store';
import { get, set } from '@vueuse/core';
import { ArrowDownNarrowWide, Check, Filter } from 'lucide-vue-next';
import { ref, watchEffect } from 'vue';
import DropdownView from '../../dropdown/Dropdown.vue';
import SelectSearchView from '../../select/SelectSearch.vue';
import { TagAction } from '../../tag/action';
import { NoteAction } from '../action';
import TagListview from '../../tag/TagList.vue'
import { TagItem } from '../../tag/type';

const store = useFilterNoteStore()

const isSortBy = (val: string) => get(noteNavbarStore).sortBy === val

const noteList = NoteAction.observable()

// 按书籍过滤
const noteAllBook = ref<TagItem[]>([])
const selectedBook = ref<TagItem>({ id: '', value: '' })
const updateBook = () => {
  const id = get(selectedBook)?.id || ''
  store.setEBookId(id)
}
const clearBookFilter = () => {
  store.setEBookId('')
  set(selectedBook, { id: '', value: '' })
}

// 标签过滤
const noteAlltag = ref<TagItem[]>([])
const selectTags = ref<TagItem[]>([])
const getTagIds = () => get(selectTags).map(item => item.id)
const updateTag = (_: TagItem) => {
  store.setTags(getTagIds())
}
const removeTag = (i: number) => {
  selectTags.value.splice(i, 1)
  store.setTags(getTagIds())
}
const clearTagFilter = () => {
  store.setTags([])
  set(selectTags, [])
}

watchEffect(() => {
  const notes = noteList.value || []
  noteAllBook.value.length = 0
  noteAlltag.value.length = 0

  const books = new Set<string>()
  const tags = new Set<string>()

  for (const note of notes) {
    const { eBookId, eBookName, tag } = note

    // 收集书本信息
    if (!books.has(note.eBookId)) {
      noteAllBook.value.push({ id: eBookId, value: eBookName })
      books.add(eBookId)
    }

    // 收集标签信息
    if (tag) {
      const _tag = TagAction.toTag(tag)
      for (const sub of _tag) {
        if (!tags.has(sub.id)) {
          noteAlltag.value.push({ id: sub.id, value: sub.tagName })
          tags.add(sub.id)
        }
      }
    }
  }
})

</script>

<template>
  <div class="flex flex-row items-center gap-2">
    <DropdownView details-class="dropdown-bottom dropdown-end" summary-class="btn btn-sm m-1">
      <template v-slot:summary>
        <ArrowDownNarrowWide />
      </template>
      <ul
        class="dropdown-content z-[1] menu p-2 min-w-52 gap-1 mt-3 shadow-lg bg-base-100 border border-accent  rounded-md ">
        <li @click="changNavbarStore('sortBy', 'bookName')">
          <a class="justify-between ">
            <span>书名</span>
            <Check v-if="isSortBy('bookName')" />
          </a>
        </li>
        <li @click="changNavbarStore('sortBy', 'addTime')">
          <a class="justify-between">
            <span>按添加时间排序</span>
            <Check v-if="isSortBy('addTime')" />
          </a>
        </li>
        <li>
        </li>
        <li @click="changNavbarStore('isUp', true)">
          <a class="justify-between">
            <div>升序<span class="ml-1 text-base-content/60" v-if="isSortBy('bookName')">(A-Z)</span></div>
            <Check v-if="noteNavbarStore.isUp" />
          </a>
        </li>
        <li @click="changNavbarStore('isUp', false)">
          <a class="justify-between">
            <div>降序<span class="ml-1 text-base-content/60" v-if="isSortBy('bookName')">(Z-A)</span></div>
            <Check v-if="!noteNavbarStore.isUp" />
          </a>
        </li>
      </ul>
    </DropdownView>
    <div class="join">
      <button class="btn btn-sm join-item rounded-r-full">
        <Filter />
      </button>
      <SelectSearchView className="input-sm join-item" v-model="selectedBook" @update:model-value="updateBook"  :data="noteAllBook"
        @clear="clearBookFilter()">
        <span>书名</span>
      </SelectSearchView>
      <SelectSearchView className="input-sm join-item" v-model="selectTags" @update:model-value="updateTag" :data="noteAlltag"
        @clear="clearTagFilter()">
        <span>标签</span>
        <TagListview :tag="selectTags" @remove="removeTag"/>
      </SelectSearchView>
    </div>
  </div>
</template>