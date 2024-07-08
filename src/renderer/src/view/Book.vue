<script setup lang="ts">
import { Book } from '@renderer/batabase';
import { BookAction, bookJump, BookListView, RingLoadingView } from '@renderer/components';
import { get, set, useToggle } from '@vueuse/core';
import { ref, watchEffect } from 'vue';

const bookList = BookAction.observable()

const [loading, setLoading] = useToggle(false)

async function onClick({ id }: Book) {
  bookJump(id)
}

const list = ref<Book[]>([])
watchEffect(() => {
  const data = get(bookList)
  if (data) {
    set(list, data)
  }
})

async function init() {
  try {
    setLoading(true)
    const data = await BookAction.getAll()
    set(list, data)
  } catch (err) {

  } finally {
    setLoading(false)
  }

}
init()
</script>

<template>
  <RingLoadingView v-if="loading"></RingLoadingView>
  <BookListView v-else :data="bookList" @click="onClick" />
</template>