<script setup lang="ts">
import { DrawerView, useToggleDrawer } from '@renderer/components';
import Menu from '@renderer/layout/Menu.vue';
import Navbar from '@renderer/layout/Navbar.vue';
import { MENU_DRAWER } from '@renderer/shared';
import { useContentCantianerStore } from '@renderer/store';
import { useDebounceFn, useElementSize, useResizeObserver } from '@vueuse/core';
import { ref } from 'vue';

const contentRef = ref<HTMLElement | null>(null)

const { isLG, toggleDrawer } = useToggleDrawer();

const store = useContentCantianerStore()

const { width } = useElementSize(contentRef)

const debouncedFn = useDebounceFn(async () => {
  store.setWidth(width.value)
}, 200)

useResizeObserver(contentRef, debouncedFn)

</script>

<template>
  <div class="block lg:hidden">
    <DrawerView :id="MENU_DRAWER">
      <Menu />
    </DrawerView>
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