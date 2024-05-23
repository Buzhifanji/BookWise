<script setup lang="ts">
import { useWindowSize } from '@vueuse/core';
import { AlignJustify, Search } from 'lucide-vue-next';
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
        <AlignJustify class="w-5 h-5" />
      </label>
      <button aria-label="Leftmenu toggle" class="btn btn-sm btn-square btn-ghost" v-on:click="toggleSidebar" v-else>
        <AlignJustify class="w-5 h-5" />
      </button>
      <button aria-label="Search button"
        class="btn hidden h-9 w-48 items-center justify-start gap-3 border-base-content/20 hover:border-transparent hover:bg-base-content/20 sm:flex btn-sm btn-outline">
        <Search class="w-4 h-4" />
      </button>
    </div>
    <div class="navbar-center"></div>
  </div>
</template>