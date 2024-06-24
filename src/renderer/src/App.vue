<script setup lang="ts">
import favicon from '@renderer/assets/favicon.ico';
import { set, useFavicon } from '@vueuse/core';
import { onUnmounted, watchEffect } from 'vue';
import { BookAction } from './components';
import './dayjs';
import { listenChannel, unlistenChannel } from './shared';
import { bookPositionStore, settingStore } from './store';
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
function recordPosition(value: MessageEvent) {
  if (value.origin !== window.origin) return
  const { bookId, value: lastReadPosition } = value.data
  BookAction.update(bookId, { lastReadPosition })
}

listenChannel(recordPosition)
// 解决特殊情况，用户把其它页面都关闭了，listenChannel会接收不到信息
watchEffect(async () => {
  for (let key in bookPositionStore.value) {
    await BookAction.update(key, { lastReadPosition: bookPositionStore.value[key] })
  }
  bookPositionStore.value = {}
})

onUnmounted(() => {
  unlistenChannel(recordPosition)
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