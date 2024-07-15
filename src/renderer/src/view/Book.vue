<script setup lang="ts">
import { Book } from '@renderer/batabase';
import { BookListView } from '@renderer/components';
import { bookJump } from '@renderer/hooks';
import { useBookStore } from '@renderer/store';
import { computed } from 'vue';

const bookStore = useBookStore()

async function onClick(val: Book) {
  console.log(val)
  bookJump(val.id, val)
}
const books = computed(() => bookStore.bookList.filter(item => !item.isDelete))
</script>

<template>
  <BookListView :data="books" @click="onClick" />
</template>