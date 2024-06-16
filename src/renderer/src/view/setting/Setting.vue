<script setup lang="ts">
import { CheckBoxView, Select, SelectView } from '@renderer/components';
import { BookshelftMode, ReadMode } from '@renderer/enum';
import { settingStore } from '@renderer/store';
import { langs } from './language';
import { themes } from './theme';

const readModeList = [
  { id: ReadMode.sroll, value: '滚动模式' },
  { id: ReadMode.section, value: '章节模式' },
  { id: ReadMode.double, value: '双页模式' },
]

const bookshelfModeList = [
  { id: BookshelftMode.bookshelf, value: '书架模式' },
  { id: BookshelftMode.card, value: '卡片模式' },
  { id: BookshelftMode.list, value: '列表模式' },
]

const textOpacity = { '--tw-text-opacity': 0.6 };

</script>

<template>
  <div class="absoulte inset-0 h-full overflow-auto scrollbar-thin">
    <div class="p-6 grid grid-cols-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-screen-2xl">
      <div class="col-span-full">
        <h2 class="font-bold text-2xl ">
          {{ $t('setting.userSetting') }}
        </h2>
      </div>
      <div class="col-span-full lg:col-auto flex flex-col gap-6">
        <div class="card w-full bg-base-100 shadow">
          <div class="card-body">
            <h2 class="card-title">{{ $t('setting.language') }} & {{ $t('setting.theme') }}</h2>
            <SelectView v-model="settingStore.lang" :list="langs" :label="$t('setting.chooseLanguage')" />
            <label class="form-control w-full max-w-xs">
              <div class="label">
                <span class="label-text" :style="textOpacity">{{ $t('setting.chooseTheme') }}</span>
              </div>
              <Select v-model="settingStore.theme" :is-cloce="false" :list="themes" />
            </label>
          </div>
        </div>
        <div class="card w-full bg-base-100 shadow">
          <div class="card-body">
            <h2 class="card-title">模式</h2>
            <SelectView v-model="settingStore.bookself" :list="bookshelfModeList" :label="'书架模式'" />
            <SelectView v-model="settingStore.readMode" :list="readModeList" :label="'阅读模式'" />
          </div>
        </div>
      </div>
      <div class="col-span-full lg:col-span-2">
        <div class="card bg-base-100 shadow w-full">
          <div class="card-body">
            <CheckBoxView v-model="settingStore.isOpenNew" title="阅读器是否打开新页面" desc="如果是否，将阅读器只会在当前页面。" />
            <CheckBoxView v-model="settingStore.isOpenRecyleBin" title="开启回收站功能"
              desc="关闭回收站，删除书籍的时候，将会被永久删除，而不是移到回收站" />
            <CheckBoxView v-model="settingStore.isNoteShowClass" title="笔记是否显示高亮样式" desc="关闭后，当鼠标滑过的时候，才会显示高亮样式" />
            <CheckBoxView v-model="settingStore.isAutoHighlight" title="是否自动高亮" desc="打开后，在选中文字的时候，会自动高亮" />
            <CheckBoxView v-model="settingStore.isRemeberPosition" title="是否记住上次阅读位置"
              desc="打开后，再次进入阅读界面，将会自动跳转到上次阅读的位置" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>