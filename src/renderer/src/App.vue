<script setup lang="ts">
import { languageStore, themeStore } from '@renderer/view/setting';
import './dayjs';

// 初始化主题
themeStore.init('light');

// 初始化语言
languageStore.init('English');

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