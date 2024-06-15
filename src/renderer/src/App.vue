<script setup lang="ts">
import { watchEffect } from 'vue';
import './dayjs';
import { settingStore } from './store';
import { setI18nLanguage } from './view/setting/language';

watchEffect(() => {
    const theme = settingStore.value.theme
    document.querySelector('html')?.setAttribute('data-theme', theme)

    const lang = settingStore.value.lang
    setI18nLanguage(lang)
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