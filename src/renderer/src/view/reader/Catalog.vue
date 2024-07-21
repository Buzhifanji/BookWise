<script setup lang="ts">
import { BookRender } from '@renderer/hooks';
import { domScrollToView } from '@renderer/shared';
import { useBookPageStore } from '@renderer/store';
import { get, useDebounceFn } from '@vueuse/core';
import { computed, ref, watchEffect } from 'vue';

const emit = defineEmits(['click'])
const handleClick = (e: any) => {
  emit('click', e)
}

const container = ref<HTMLElement>()

const bookPageStore = useBookPageStore()
const bookToc = computed(() => get(BookRender.bookToc))

const scroll = useDebounceFn((_: number | string) => {
  domScrollToView(get(container), 'a.active')
}, 100)

watchEffect(() => {
  scroll(bookPageStore.page)
})
</script>

<template>
  <div class="catalog-wrapper bg-base-100 overflow-auto hover:scrollbar-thin scrollbar-none" ref="container">
    <!-- <FoldTreeView :data="data" v-if="settingStore.isFoldCatalog" /> -->
    <ExpandTreeView :data="bookToc" :active="bookPageStore.page" @click="handleClick" />
  </div>
</template>

<style scoped>
.catalog-wrapper {
  --catalog-bar-width: 16rem;
  width: var(--catalog-bar-width);
  transition: all .3s;
  position: sticky;
  bottom: 0;
  top: 0;
  height: 100vh;
  min-width: 16rem;
  border-inline-end-width: 1px;
  --tw-border-opacity: 1;
  border-color: var(--fallback-b2, oklch(var(--b2) / var(--tw-border-opacity)));
}

.catalog-wrapper.hide {
  margin-inline-start: calc(var(--catalog-bar-width)* -1);
}
</style>