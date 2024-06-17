<script setup lang="ts">
import { settingStore } from '@renderer/store';
import 'pdfjs-dist/web/pdf_viewer.css';
import { watchEffect } from 'vue';
import { setSpreadMode } from './pdf';


watchEffect(async () => {
  setSpreadMode(settingStore.value.readMode)
})

</script>

<template>

</template>