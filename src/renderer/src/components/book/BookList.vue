<script setup lang="ts">
import { reactive } from 'vue'
import { ref, computed, onMounted, type VNodeRef } from 'vue'
import { useWindowVirtualizer, useVirtualizer } from '@tanstack/vue-virtual'

const props = defineProps<{
  data: any[]
}>()

const rowVirtualizerOptions = computed(() => {
  return {
    count: data.length,
    estimateSize: () => 350,
    overscan: 5,
    scrollMargin: parentOffsetRef.value,
  }
})

const rowVirtualizer = useWindowVirtualizer(rowVirtualizerOptions)

const virtualRows = computed(() => rowVirtualizer.value.getVirtualItems())

const totalSize = computed(() => rowVirtualizer.value.getTotalSize())
</script>

<template>
  <ul class="versions">
    <li class="electron-version">Electron v{{ versions.electron }}</li>
    <li class="chrome-version">Chromium v{{ versions.chrome }}</li>
    <li class="node-version">Node v{{ versions.node }}</li>
  </ul>
</template>
