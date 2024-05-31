<script setup lang="ts">

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
</script>

<template>
  <div class="catalog-wrapper bg-base-100 overflow-auto hover:scrollbar-thin scrollbar-none">
    <!-- <FoldTree :data="data" v-if="settingStore.isFoldCatalog" /> -->
    <ExpandTree :data="data" @click="handleClick" />
  </div>
</template>

<style scoped>
.catalog-wrapper {
  --catalog-bar-width: 400px;
  width: var(--catalog-bar-width);
  transition: all .3s;
  position: sticky;
  bottom: 0;
  top: 0;
  height: 100vh;
  min-width: 15rem;
  border-inline-end-width: 1px;
  --tw-border-opacity: 1;
  border-color: var(--fallback-b2, oklch(var(--b2) / var(--tw-border-opacity)));
}

.catalog-wrapper.hide {
  margin-inline-start: calc(var(--catalog-bar-width)* -1);
}
</style>