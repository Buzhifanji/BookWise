<script setup lang="ts">
import {BookListView} from '@renderer/components/book'

const data = new Array(100).fill(0).map((_, i) => `Column ${i}`)


</script>

<template>
  <BookListView :data="data" />
</template>