<script setup lang="ts">
import Menu from '@renderer/layout/Menu.vue';
import Navbar from '@renderer/layout/Navbar.vue';
import { useContentCantianerStore } from '@renderer/store';
import { languageStore, themeStore } from '@renderer/view/setting';
import { useElementSize, useWindowSize } from '@vueuse/core';
import { ref, watchEffect } from 'vue';

const contentRef = ref<HTMLElement | null>(null)
const lgMenu = ref(false);

const { width } = useElementSize(contentRef)

const store = useContentCantianerStore()

watchEffect(() => {
  store.setWidth(width.value)
})

function toggleMenu() {
  const { width } = useWindowSize();
  if (width.value >= 1024) {
    lgMenu.value = !lgMenu.value;
  }
}

// 初始化主题
themeStore.init('light');

// 初始化语言
languageStore.init('English');
</script>

<template>
  <div class="block lg:hidden">
    <div class="drawer z-20">
      <input aria-label="Drawer handler" id="sidbar-drawer" class="drawer-toggle" type="checkbox">
      <div class="drawer-content"></div>
      <div class="drawer-side">
        <label class="drawer-overlay" for="sidbar-drawer" aria-label="close sidebar"></label>
        <Menu />
      </div>
    </div>
  </div>
  <div class="hidden lg:block">
    <Menu :class="{ 'hide': lgMenu }" />
  </div>
  <div class="w-full max-w-full h-screen ">
    <div class="flex h-full flex-col ">
      <Navbar @toggle-sidebar="toggleMenu" />
      <div ref="contentRef" class="flex-1 bg-base-200 overflow-hidden">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>