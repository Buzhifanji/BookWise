<script setup lang="ts">
import { Book } from '@renderer/batabase';
import { BookAction, BookListView, bookJump } from '@renderer/components';

const bookList = BookAction.observable()

async function onClick({ id }: Book) {
  bookJump(id)
}

</script>

<template>
  <BookListView :data="bookList || []" @click="onClick" />
</template>