<script setup lang="ts">
import { changNavbarStore, noteNavbarStore } from '@renderer/store';
import { get } from '@vueuse/core';
import { ArrowDownNarrowWide, Check } from 'lucide-vue-next';
import DropdownView from '../../dropdown/Dropdown.vue';

const isSortBy = (val: string) => get(noteNavbarStore).sortBy === val

</script>

<template>
  <div>
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
            <span>升序</span>
            <Check v-if="noteNavbarStore.isUp" />
          </a>
        </li>
        <li @click="changNavbarStore('isUp', false)">
          <a class="justify-between">
            <span>降序</span>
            <Check v-if="!noteNavbarStore.isUp" />
          </a>
        </li>
      </ul>
    </DropdownView>
  </div>
</template>