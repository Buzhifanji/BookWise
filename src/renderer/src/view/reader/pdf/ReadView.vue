<script setup lang="ts">
import 'pdfjs-dist/web/pdf_viewer.css';
import { ref } from 'vue';
import DoubleReaderView from './DoubleReader.vue';
import ScrollReaderView from './ScrollReader.vue';
import SectionReaderView from './SectionReader.vue';

const scrollReaderViewRef = ref<InstanceType<typeof ScrollReaderView>>() // 滚动视图
const sectionReaderViewRef = ref<InstanceType<typeof SectionReaderView>>() // 章节视图
const doubleReaderViewRef = ref<InstanceType<typeof DoubleReaderView>>() // 双栏视图

</script>

<template>

  <!-- 滚动条模式 -->
  <!-- <ScrollReaderView ref="scrollReaderViewRef" v-if="settingStore.readMode === ReadMode.sroll" /> -->
  <!-- 章节模式 -->
  <!-- <SectionReaderView ref="sectionReaderViewRef" v-if="settingStore.readMode === ReadMode.section" /> -->
  <!-- 双栏模式 -->
  <!-- <DoubleReaderView ref="doubleReaderViewRef" v-if="settingStore.readMode === ReadMode.double" /> -->
</template>