<script setup lang="ts">
import { BookListView } from '@renderer/components';
import { useBookStore } from '@renderer/store';
import { computed } from 'vue';

const bookStore = useBookStore()
const books = computed(() => bookStore.bookList.filter(item => !!item.isDelete))
</script>

<template>
  <BookListView :data="books" :isRecycleBin="true" />
</template>