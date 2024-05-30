<script setup lang="ts">
import { Book, BookContent, db } from '@renderer/batabase';
import { CETALOG_DRAWER, isElectron } from '@renderer/shared';
import { useWindowSize } from '@vueuse/core';
import { AlignJustify, Search } from 'lucide-vue-next';
import { computed, ref } from 'vue';

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

const { width } = useWindowSize();
const isSM = computed(() => width.value < 1024);
</script>

<template>
  <div role="navigation" aria-label="Navbar" class="navbar z-10 border-b border-base-200 px-3">
    <div class="gap-3 navbar-start">
      <!-- 控制侧边栏菜单栏 -->
      <label :for="CETALOG_DRAWER" class="cursor-pointer " v-if="isSM">
        <AlignJustify class="w-5 h-5" />
      </label>
      <button aria-label="Leftmenu toggle" class="btn btn-sm btn-square btn-ghost" v-else>
        <AlignJustify class="w-5 h-5" />
      </button>
      <!-- 打开搜索框按钮 -->
      <button aria-label="Search button"
        class="btn hidden h-9 w-48 items-center justify-start gap-3 border-base-content/20 hover:border-transparent hover:bg-base-content/20 sm:flex btn-sm btn-outline">
        <Search class="w-4 h-4" />
      </button>
    </div>
    <div class="navbar-center"></div>
    <div class="navbar-end gap-4">
      <!-- <button class="btn btn-sm btn-neutral btn-active" @click="uploadAction()">上传</button>
      <FileUploadView ref="dialogRef" /> -->
    </div>
  </div>
</template>