<script setup lang="ts">

interface Props {
  id: string
  isRight: boolean
}

defineProps<Props>()

</script>

<template>
  <div class="drawer z-20" :class="{ 'drawer-end': isRight }">
    <input aria-label="Drawer handler" :id="id" class="drawer-toggle" type="checkbox">
    <div class="drawer-content"></div>
    <div class="drawer-side">
      <label class="drawer-overlay" :for="id" aria-label="close sidebar"></label>
      <slot></slot>
    </div>
  </div>
</template>