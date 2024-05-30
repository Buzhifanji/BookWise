<script setup lang="ts">
import { Drawer, useToggleDrawer } from '@renderer/components/drawer';
import Menu from '@renderer/layout/Menu.vue';
import Navbar from '@renderer/layout/Navbar.vue';
import { MENU_DRAWER } from '@renderer/shared';
import { useContentCantianerStore } from '@renderer/store';
import { useElementSize } from '@vueuse/core';
import { ref, watchEffect } from 'vue';

const contentRef = ref<HTMLElement | null>(null)

const { isLG, toggleDrawer } = useToggleDrawer();

const { width } = useElementSize(contentRef)

const store = useContentCantianerStore()

watchEffect(() => {
  store.setWidth(width.value)
})


</script>

<template>
  <div class="block lg:hidden">
    <Drawer :id="MENU_DRAWER">
      <Menu />
    </Drawer>
  </div>
  <div class="hidden lg:block">
    <Menu :class="{ 'hide': isLG }" />
  </div>
  <div class="w-full max-w-full h-screen ">
    <div class="flex h-full flex-col ">
      <Navbar @toggle-sidebar="toggleDrawer" />
      <div ref="contentRef" class="flex-1 bg-base-200 overflow-hidden">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>