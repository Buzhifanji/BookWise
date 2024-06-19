<script setup lang="ts">
import { BookAction, BookListView } from '@renderer/components';

const bookList = BookAction.observable(true)

</script>

<template>
  <BookListView :data="bookList || []" :isRecycleBin="true" />
</template>