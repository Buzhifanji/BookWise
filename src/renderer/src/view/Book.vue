<script setup lang="ts">
import { Book } from '@renderer/batabase';
import { BookAction, BookListView } from '@renderer/components';
import { RouterName } from '@renderer/route';
import { isElectron } from '@renderer/shared';
import { settingStore } from '@renderer/store';
import { useRouter } from 'vue-router';

const router = useRouter()

const bookList = BookAction.observable()

async function onClick({ id }: Book) {
  const isBlank = settingStore.value.isOpenNew;
  if (isElectron) {
    // 桌面版
    if (isBlank) {
      const { href } = router.resolve({ name: RouterName.Reader, params: { id } });
      window.open(href, '_blank');
    } else {
      router.push({ name: RouterName.Reader, params: { id } })
    }
  } else {
    // 网页版
    if (isBlank) {
      const { href } = router.resolve({ name: RouterName.Reader, params: { id } });
      window.open(href, '_blank');
    } else {
      router.push({ name: RouterName.Reader, params: { id } })
    }
  }
}

</script>

<template>
  <BookListView :data="bookList || []" @click="onClick" />
</template>