<script setup lang="ts">
import { t } from '@renderer/data';
import { bookSortStore, BookSortType, changeBookSortStore, useBookFilterStore } from '@renderer/store';
import { get, set } from '@vueuse/core';
import { ArrowDownNarrowWide, Check, Filter } from 'lucide-vue-next';
import { computed, ref, watchEffect } from 'vue';
import { BookshelfAction } from '../../bookshelf/action';
import DropdownView from '../../dropdown/Dropdown.vue';
import SelectSearchView from '../../select/SelectSearch.vue';
import TagListview from '../../tag/TagList.vue';

const store = useBookFilterStore()
const isSortBy = (val: string) => get(bookSortStore).sortBy === val

const list = computed(() => [
  { label: t('sort.updateTime'), value: 'updateTime' },
  { label: t('sort.addTime'), value: 'addTime' },
  { label: t('sort.readProgress'), value: 'readProgress' },
  { label: t('sort.readTime'), value: 'readTime' },
  { label: t('book.name'), value: 'bookName' },
  { label: t('book.author'), value: 'author' },
  { label: t('book.score'), value: 'score' },
] as { label: string, value: BookSortType }[])

// 按照书架过滤
const bookshelf = BookshelfAction.observable()
const allBookshelf = computed(() => (get(bookshelf) || []).map(item => ({ id: item.id, value: item.name })))
const selectedBookshelft = ref<{ id: string, value: string }[]>([])
const clearBookshelf = () => {
  store.setBookshelf('')
  set(selectedBookshelft, [])
}
const updateBookshelf = () => {
  const val = get(selectedBookshelft)
  if (val.length) {
    store.setBookshelf(val[0].id)
  } else {
    clearBookshelf()
  }
}
const onRemove = () => clearBookshelf()

// 搜索书架
watchEffect(() => {
  const tag = store.searchBookshelf
  if (tag) {
    set(selectedBookshelft, [tag])
    store.setBookshelf(tag.id)
    store.setSearchBookshelf(undefined)
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
        <li @click="changeBookSortStore('sortBy', item.value)" v-for="item in list">
          <a class="justify-between ">
            <span>{{ item.label }}</span>
            <Check v-if="isSortBy(item.value)" />
          </a>
        </li>
        <li>
        </li>
        <li @click="changeBookSortStore('isUp', true)">
          <a class="justify-between">
            <div>{{ t('sort.asc') }}<span class="ml-1 text-base-content/60" v-if="isSortBy('bookName')">(A-Z)</span>
            </div>
            <Check v-if="bookSortStore.isUp" />
          </a>
        </li>
        <li @click="changeBookSortStore('isUp', false)">
          <a class="justify-between">
            <div>{{ t('sort.desc') }}<span class="ml-1 text-base-content/60" v-if="isSortBy('bookName')">(Z-A)</span>
            </div>
            <Check v-if="!bookSortStore.isUp" />
          </a>
        </li>
      </ul>
    </DropdownView>
    <div class="join">
      <button class="btn btn-sm join-item rounded-r-full">
        <Filter />
      </button>
      <SelectSearchView className="input-sm join-item" v-model="selectedBookshelft"
        @update:model-value="updateBookshelf" :placeholder="t('book.needBookshelfName')" :data="allBookshelf"
        @clear="clearBookshelf()">
        <span>{{ t('book.bookshelf') }}</span>
        <TagListview :tag="selectedBookshelft" @remove="onRemove" />
      </SelectSearchView>
    </div>
  </div>
</template>