<script setup lang="ts">
import { clearDB } from '@renderer/batabase';
import { CheckBoxView, Select, SelectView, } from '@renderer/components';
import { bookshelfModeList, langs, nodeModeList, readModeList, t, themes } from '@renderer/data';
import { settingStore } from '@renderer/store';

const textOpacity = { '--tw-text-opacity': 0.6 };

</script>

<template>
  <div class="absoulte inset-0 h-full overflow-auto scrollbar-thin">
    <div class="p-6 grid grid-cols-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-screen-2xl">
      <div class="col-span-full">
        <h2 class="font-bold text-2xl ">
          {{ t('setting.userSetting') }}
        </h2>
      </div>
      <div class="col-span-full lg:col-auto flex flex-col gap-6">
        <div class="card w-full bg-base-100 shadow">
          <div class="card-body">
            <h2 class="card-title">{{ t('setting.language') }} & {{ t('setting.theme') }}</h2>
            <SelectView v-model="settingStore.lang" :list="langs" :label="t('setting.chooseLanguage')" />
            <label class="form-control w-full max-w-xs">
              <div class="label">
                <span class="label-text" :style="textOpacity">{{ t('setting.chooseTheme') }}</span>
              </div>
              <Select v-model="settingStore.theme" :is-cloce="false" :list="themes" />
            </label>
          </div>
        </div>
        <div class="card w-full bg-base-100 shadow">
          <div class="card-body">
            <h2 class="card-title">{{ t('setting.mode') }}</h2>
            <SelectView v-model="settingStore.bookshelf" :list="bookshelfModeList" :label="t('setting.bookMode')" />
            <SelectView v-model="settingStore.readMode" :list="readModeList" :label="t('setting.readMode')" />
            <SelectView v-model="settingStore.noteMode" :list="nodeModeList" :label="t('note.mode')" />
          </div>
        </div>
      </div>
      <div class="col-span-full lg:col-span-2">
        <div class="card bg-base-100 shadow w-full">
          <div class="card-body">
            <CheckBoxView v-model="settingStore.isOpenNew" :title="t('setting.openNewTitle')"
              :desc="t('setting.openNewDesc')" />
            <CheckBoxView v-model="settingStore.isOpenRecycleBin" :title="t('setting.openRecycleBinTitle')"
              :desc="t('setting.openRecycleBinDesc')" />
            <CheckBoxView v-model="settingStore.isNoteShowClass" :title="t('setting.noteShowClassTitle')"
              :desc="t('setting.noteShowClassDesc')" />
            <CheckBoxView v-model="settingStore.isAutoHighlight" :title="t('setting.autoHighlightTitle')"
              :desc="t('setting.autoHighlightDesc')" />
            <CheckBoxView v-model="settingStore.isRemeberPosition" :title="t('setting.rememberPositionTitle')"
              :desc="t('setting.rememberPositionDesc')" />
            <div>
              <button class="btn btn-error" @click="clearDB()">清空所有数据</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>