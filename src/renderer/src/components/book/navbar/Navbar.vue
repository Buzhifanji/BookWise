<script setup lang="ts">
import { bookSortStore, BookSortType, changeBookSortStore, useBookFilterStore } from '@renderer/store';
import { get } from '@vueuse/core';
import { ArrowDownNarrowWide, Check } from 'lucide-vue-next';
import DropdownView from '../../dropdown/Dropdown.vue';

const store = useBookFilterStore()
const isSortBy = (val: string) => get(bookSortStore).sortBy === val


const list: { label: string, value: BookSortType }[] = [
  { label: '最近阅读', value: 'updateTime' },
  { label: '添加时间', value: 'addTime' },
  { label: '阅读进度', value: 'readProgress' },
  { label: '阅读时长', value: 'readTime' },
  { label: '书名', value: 'bookName' },
  { label: '作者', value: 'author' },
  { label: '评分', value: 'score' },
]

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
            <div>升序<span class="ml-1 text-base-content/60" v-if="isSortBy('bookName')">(A-Z)</span></div>
            <Check v-if="bookSortStore.isUp" />
          </a>
        </li>
        <li @click="changeBookSortStore('isUp', false)">
          <a class="justify-between">
            <div>降序<span class="ml-1 text-base-content/60" v-if="isSortBy('bookName')">(Z-A)</span></div>
            <Check v-if="!bookSortStore.isUp" />
          </a>
        </li>
      </ul>
    </DropdownView>
    <!-- <div class="join">
      <button class="btn btn-sm join-item rounded-r-full">
        <Filter />
      </button>
      <SelectSearchView className="input-sm join-item" v-model="selectedBook" @update:model-value="updateBook"
        :data="noteAllBook" @clear="clearBookFilter()">
        <span>书名</span>
      </SelectSearchView>
      <SelectSearchView className="input-sm join-item" v-model="selectTags" @update:model-value="updateTag"
        :data="noteAlltag" @clear="clearTagFilter()">
        <span>标签</span>
        <TagListview :tag="selectTags" @remove="removeTag" />
      </SelectSearchView>
    </div> -->
  </div>
</template>