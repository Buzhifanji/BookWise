<script setup lang="ts">
import { Book } from '@renderer/batabase';
import { bookJump, BookListView } from '@renderer/components';
import { useBookStore } from '@renderer/store';
import { computed } from 'vue';

const bookStore = useBookStore()

async function onClick({ id }: Book) {
  bookJump(id)
}
const books = computed(() => bookStore.bookList.filter(item => !item.isDelete))
</script>

<template>
  <BookListView :data="books" @click="onClick" />
</template>