<script setup lang="ts">
import { Book, BookContent, db } from '@renderer/batabase';
import { Drawer, useToggleDrawer } from '@renderer/components/drawer';
import { CETALOG_DRAWER, NOTE_DRAWER, isElectron } from '@renderer/shared';
import { useWindowSize } from '@vueuse/core';
import { AlignJustify, Search } from 'lucide-vue-next';
import { computed, ref } from 'vue';
import CatalogView from './Catalog.vue';
import NoteView from './Note.vue';

const props = defineProps({
  id: String,
})



const book = ref<Book>()
const bookContent = ref<BookContent>()

const { isLG: isCatalog, toggleDrawer: toggleCatalog } = useToggleDrawer();
const { isLG: isNote, toggleDrawer: toggleNote } = useToggleDrawer()


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
  <div class="block lg:hidden">
    <Drawer :id="CETALOG_DRAWER">
      <CatalogView />
    </Drawer>
  </div>
  <div class="hidden lg:block">
    <CatalogView :class="{ 'hide': isCatalog }" />
  </div>
  <div class="w-full max-w-full h-screen ">
    <div class="flex h-full flex-col ">
      <div role="navigation" aria-label="Navbar" class="navbar z-10 border-b border-base-200 px-3">
        <div class="gap-3 navbar-start">
          <!-- 控制侧边栏菜单栏 -->
          <label :for="CETALOG_DRAWER" class="cursor-pointer " v-if="isSM">
            <AlignJustify class="w-5 h-5" />
          </label>
          <button aria-label="Leftmenu toggle" @click="toggleCatalog" class="btn btn-sm btn-square btn-ghost" v-else>
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
          <label :for="NOTE_DRAWER" class="cursor-pointer " v-if="isSM">
            <AlignJustify class="w-5 h-5" />
          </label>
          <button aria-label="Leftmenu toggle" @click="toggleNote" class="btn btn-sm btn-square btn-ghost" v-else>
            <AlignJustify class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="block lg:hidden">
    <Drawer :id="NOTE_DRAWER" :is-right="true">
      <NoteView />
    </Drawer>
  </div>
  <div class="hidden lg:block">
    <NoteView :class="{ 'hide': isNote }" />
  </div>
</template>