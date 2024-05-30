<script setup lang="ts">
import { Book, db } from '@renderer/batabase';
import { BookListView } from '@renderer/components';
import { useObservable } from "@vueuse/rxjs";
import { liveQuery } from "dexie";

// 不知道如何 ts 报错：Observable<Book[]>”缺少类型“Observable<Book[]>”的以下属性: source, operator, lift, forEach 及其他 2 项
// 暂时用 any 替代
const bookList = useObservable<Book[], Book[]>((liveQuery(() => db.books.toArray())) as any, [] as any)

</script>

<template>
  <BookListView :data="bookList" />
</template>@renderer/components/book