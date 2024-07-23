<script setup lang="ts">
import { ListenBookContentView, RingLoadingView } from '@renderer/components';
import { BookRender, renderBook } from '@renderer/hooks';
import { useToggle } from '@vueuse/core';
const props = defineProps({
  id: String,
})

const bookInfo = BookRender.bookInfo

const [loading, setLoading] = useToggle(false)

async function loadData() {
  try {
    setLoading(true)
    const bookId = props.id
    if (!bookId) return

    await renderBook(bookId)
    await BookRender.handleBookSection()

  } catch (err) {
    console.log(err)
  } finally {
    setLoading(false)
  }
}
loadData()
</script>

<template>
  <div class="flex justify-center items-center w-screen h-screen p-10 bg-base-200">
    <div v-if="bookInfo"
      class="w-full max-w-screen-2xl h-full flex flex-col bg-base-100 rounded-lg py-4  overflow-hidden">
      <h3 class="text-center text-2xl font-bold mb-4 line-clamp-1 px-3">{{ bookInfo.name }} </h3>
      <RingLoadingView v-if="loading" />
      <ListenBookContentView :book-id="bookInfo.id" v-else />
    </div>
  </div>
</template>