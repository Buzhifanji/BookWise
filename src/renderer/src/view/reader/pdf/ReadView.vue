<script setup lang="ts">
import { settingStore } from '@renderer/store';
import 'pdfjs-dist/web/pdf_viewer.css';
import { onUnmounted, watchEffect } from 'vue';
import { PDF, setSpreadMode } from './pdf';


watchEffect(async () => {
  setSpreadMode(settingStore.value.readMode)
})

onUnmounted(() => PDF.destroy())

</script>

<template>

</template>