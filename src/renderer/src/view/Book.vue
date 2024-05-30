<script setup lang="ts">
import { Book, db } from '@renderer/batabase';
import { BookListView } from '@renderer/components';
import { RouterName } from '@renderer/route';
import { isElectron } from '@renderer/shared';
import { settingStore } from '@renderer/store';
import { useObservable } from '@vueuse/rxjs';
import { liveQuery } from 'dexie';
import { useRouter } from 'vue-router';

const router = useRouter()

// 不知道如何 ts 报错：Observable<Book[]>”缺少类型“Observable<Book[]>”的以下属性: source, operator, lift, forEach 及其他 2 项
// 暂时用 any 替代
const bookList = useObservable<Book[], Book[]>((liveQuery(async () => await db.books.toArray())) as any)


function onClick(value: Book) {
  const isBlank = settingStore.value.isOpenNew;
  router.push({ name: RouterName.Reader, params: { id: value.id } })
  if (isElectron) {
    // 桌面版

  } else {
    // 网页版
    if (isBlank) {

    } else {

    }
  }
}

</script>

<template>
  <BookListView :data="bookList || []" @click="onClick" />
</template>