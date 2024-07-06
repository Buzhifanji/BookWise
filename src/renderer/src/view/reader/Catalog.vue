<script setup lang="ts">
import { useBookPageStore } from '@renderer/store';
import { useDebounceFn } from '@vueuse/core';
import scrollIntoView from 'scroll-into-view-if-needed';
import { defineProps, ref, watchEffect, withDefaults } from 'vue';

interface Props {
  data: any[],
}

withDefaults(defineProps<Props>(), {
  data: () => [],
})

const emit = defineEmits(['click'])
const handleClick = (e: any) => {
  emit('click', e)
}

const container = ref<HTMLElement | null>(null)

const bookPageStore = useBookPageStore()

const scroll = useDebounceFn((_: number) => {
  const dom = container.value
  if (dom) {
    const acitveDom = dom.querySelector('a.active')
    if (acitveDom) {
      scrollIntoView(acitveDom, { behavior: 'smooth', scrollMode: 'if-needed' })
    }
  }
}, 100)

watchEffect(() => {
  scroll(bookPageStore.page)
})
</script>

<template>
  <div class="catalog-wrapper bg-base-100 overflow-auto hover:scrollbar-thin scrollbar-none" ref="container">
    <!-- <FoldTreeView :data="data" v-if="settingStore.isFoldCatalog" /> -->
    <ExpandTreeView :data="data" :active="bookPageStore.page" @click="handleClick" />
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