<script setup lang="ts">
import { settingStore } from '@renderer/store';
import { nodeModeList, selectNodeMode, t } from '@renderer/view/setting';
import { Bolt, SquareArrowUpLeft } from 'lucide-vue-next';
import DropdownView from '../../dropdown/Dropdown.vue';
import List from '../../list/List.vue';
import { editTagDialog } from '../../tag';

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
              <span class="stat-title">{{ t('note.mode') }}</span>
              <div class="badge badge-outline">{{ selectNodeMode(settingStore.noteMode) }}</div>
            </template>
            <List
              class="dropdown-content !top-0 !right-[18.5rem]  !border-secondary  rounded-s-lg rounded-ee-lg z-[2] w-52"
              :list="nodeModeList" v-model="settingStore.noteMode" />
          </DropdownView>
        </a>
      </li>
      <li @click="editTagDialog()">
        <a class="!p-0 my-1">
          <div class="flex flex-row py-2 px-4 justify-between w-72">
            <span class="stat-title">标签管理</span>
            <SquareArrowUpLeft />
          </div>
        </a>
      </li>
    </ul>
  </DropdownView>

</template>