<script setup lang="ts">
import favicon from '@renderer/assets/favicon.ico';
import { set, useFavicon } from '@vueuse/core';
import { watchEffect } from 'vue';
import { BookAction, BookReadTimeAction } from './components';
import './dayjs';
import { bookPositionStore, bookReadTimeStore, settingStore } from './store';
import { setI18nLanguage } from './view/setting/language';


watchEffect(() => {
  const theme = settingStore.value.theme
  document.querySelector('html')?.setAttribute('data-theme', theme)

  const lang = settingStore.value.lang
  setI18nLanguage(lang)
})

// 设置icon
const icon = useFavicon()
set(icon, favicon)

// 监听跨窗口的消息

// 记录最新阅读位置
watchEffect(async () => {
  for (let key in bookPositionStore.value) {
    await BookAction.update(key, { lastReadPosition: bookPositionStore.value[key] })
  }
  bookPositionStore.value = {}
})

// 记录阅读时长
watchEffect(async () => {
  for (let key in bookReadTimeStore.value) {
    await BookReadTimeAction.add(JSON.parse(bookReadTimeStore.value[key]))
  }
  bookReadTimeStore.value = {}
})

</script>

<template>
  <div class="size-full" @contextmenu.prevent>
    <div class="flex overflow-hidden">
      <router-view v-slot="{ Component }">
        <template v-if="Component">
          <Suspense>
            <component :is="Component" />
          </Suspense>
        </template>
      </router-view>
    </div>
  </div>
</template>