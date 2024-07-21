<script setup lang="ts">
import { BookRender, renderBook } from '@renderer/hooks';
import ListenBookContent from './ListenBookContent.vue';

const props = defineProps({
  id: String,
})

const bookInfo = BookRender.bookInfo

async function loadData() {
  try {
    const bookId = props.id
    if (!bookId) return

    const data = await renderBook(bookId)
    BookRender.handleBookSection()

    if (!data) return
  } catch (err) {
    console.log(err)
  } finally {
  }
}

loadData()
</script>

<template>
  <div class="flex justify-center items-center w-screen h-screen p-10 bg-base-200">
    <div v-if="bookInfo"
      class="w-full max-w-screen-2xl h-full flex flex-col bg-base-100 rounded-lg py-4  overflow-hidden">
      <h3 class="text-center text-2xl font-bold mb-4 line-clamp-1 px-3">{{ bookInfo.name }} </h3>
      <ListenBookContent ref="readerListenBookViewRef" :book-id="bookInfo.id" />
    </div>
  </div>
</template>