<script setup lang="ts">
import { useWindowSize } from '@vueuse/core';
import { computed } from 'vue';
const emit = defineEmits<{
  (e: 'toggleSidebar', payload: string): void;
}>();

const toggleSidebar = () => emit('toggleSidebar', '');

const { width } = useWindowSize();

const isSM = computed(() => width.value < 1024);
</script>

<template>
  <div role="navigation" aria-label="Navbar" class="navbar z-10 border-b border-base-200 px-3">
    <div class="gap-3 navbar-start">
      <label for="sidbar-drawer" v-if="isSM">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img"
          class="inline-block" font-size="20" width="1em" height="1em" viewBox="0 0 24 24">
          <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M4 12h16M4 6h16M4 18h16"></path>
        </svg>
      </label>
      <button aria-label="Leftmenu toggle" class="btn btn-sm btn-square btn-ghost" v-on:click="toggleSidebar" v-else>
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img"
          class="inline-block" font-size="20" width="1em" height="1em" viewBox="0 0 24 24">
          <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M4 12h16M4 6h16M4 18h16"></path>
        </svg>
      </button>
      <button aria-label="Search button"
        class="btn hidden h-9 w-48 items-center justify-start gap-3 border-base-content/20 hover:border-transparent hover:bg-base-content/20 sm:flex btn-sm btn-outline"><svg
          xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img"
          class="text-base-content/60" font-size="15" width="1em" height="1em" viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21l-4.3-4.3"></path>
          </g>
        </svg><span class="text-base-content/60">Search</span></button><button aria-label="Search button"
        class="btn flex border-base-content/20 hover:border-transparent hover:bg-base-content/20 sm:hidden btn-sm btn-circle btn-outline"><svg
          xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img"
          class="text-base-content/60" font-size="15" width="1em" height="1em" viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21l-4.3-4.3"></path>
          </g>
        </svg>
      </button>
    </div>
    <div class="navbar-center"></div>
  </div>
</template>