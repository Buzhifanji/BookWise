<script setup lang="ts">
import { Book, BookContent, db } from '@renderer/batabase';
import { isElectron } from '@renderer/shared';
import { ref } from 'vue';

const props = defineProps({
  id: String,
})

const book = ref<Book>()
const bookContent = ref<BookContent>()


async function getBookContent(bookId: string, url: string) {
  try {
    if (isElectron) {
      // 桌面从路径中获取文件
      const fs = await import('fs')
      const content = await fs.promises.readFile(url, 'binary')
      return JSON.parse(content)
    } else {
      // 网页从数据库中获取
      return await db.bookContents.where('bookId').equals(bookId).first()
    }
  } catch (err) {

  }

}

async function loadData() {
  const bookId = props.id
  if (!bookId) return

  const info = await db.books.get(bookId)
  if (!info) return

  const content = await getBookContent(bookId, info.path)

  console.log(content)
  if (!content) return

  console.log(info)

  book.value = info
  bookContent.value = content

}

loadData()

console.log(props.id)
</script>

<template>
  <div>reader</div>
</template>