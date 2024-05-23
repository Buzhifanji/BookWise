<script setup lang="ts">
import { useWindowSize } from '@vueuse/core';
import { ref } from 'vue';
import Menu from './layout/Menu.vue';
import Navbar from './layout/Navbar.vue';

const lgMenu = ref(false);

function toggleMenu() {
  const { width } = useWindowSize();
  if (width.value >= 1024) {
    lgMenu.value = !lgMenu.value;
  }
}

</script>

<template>
  <div class="size-full">
    <div class="flex overflow-hidden">
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
      <div class="w-full max-w-full h-screen overflow-auto">
        <div class="flex h-full flex-col ">
          <Navbar @toggle-sidebar="toggleMenu" />
        </div>
      </div>
    </div>
  </div>
</template>