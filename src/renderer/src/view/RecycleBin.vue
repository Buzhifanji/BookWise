<script setup lang="ts">
import { Book, db } from '@renderer/batabase';
import { BookListView } from '@renderer/components';
import { useObservable } from '@vueuse/rxjs';
import { liveQuery } from 'dexie';

const bookList = useObservable<Book[], Book[]>((liveQuery(async () => (await db.books.toArray()).filter(item => item.isDelete))) as any)

async function onClick({ id }: Book) {

}

</script>

<template>
  <BookListView :data="bookList || []" @click="onClick" />
</template>