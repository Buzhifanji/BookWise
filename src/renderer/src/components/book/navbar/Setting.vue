<script setup lang="ts">
import { bookshelfModeList, getSelectBookshelfMode, t } from '@renderer/data';
import { settingStore } from '@renderer/store';
import { Bolt, SquareArrowUpLeft } from 'lucide-vue-next';
import { editBookshelfDialog } from '../../bookshelf';
import DropdownView from '../../dropdown/Dropdown.vue';
import List from '../../list/List.vue';
</script>

<template>
  <DropdownView details-class="dropdown-bottom dropdown-end" summary-class="btn btn-sm m-1">
    <template v-slot:summary>
      <Bolt />
    </template>
    <ul class="dropdown-content z-[1] menu p-2  mt-2.5 shadow bg-base-100 border border-accent  rounded-md divide-y ">
      <li>
        <a class="!p-0 my-1">
          <DropdownView summary-class="flex flex-row justify-between w-72 dropdown-left px-4 py-2">
            <template v-slot:summary>
              <span class="stat-title">{{ t('setting.readMode') }}</span>
              <div class="badge badge-outline">{{ getSelectBookshelfMode(settingStore.bookshelf) }}</div>
            </template>
            <List
              class="dropdown-content !top-0 !right-[18.5rem]  !border-secondary  rounded-s-lg rounded-ee-lg z-[2] w-52"
              :list="bookshelfModeList" v-model="settingStore.bookshelf" />
          </DropdownView>
        </a>
      </li>
      <li @click="editBookshelfDialog()">
        <a class="!p-0 my-1">
          <div class="flex flex-row py-2 px-4 justify-between w-72">
            <span class="stat-title">{{ t('book.bookshelfManage') }}</span>
            <SquareArrowUpLeft />
          </div>
        </a>
      </li>
    </ul>
  </DropdownView>

</template>