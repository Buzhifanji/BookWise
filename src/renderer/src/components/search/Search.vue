<script setup lang="ts">
import { t } from '@renderer/data';
import { useDialog } from '@renderer/hooks';
import { router, RouterName } from '@renderer/route';
import { useBookFilterStore, useBookshelfStore, useBookStore, useFilterNoteStore, useNoteStore, useTagStore } from '@renderer/store';
import { useVirtualizer } from '@tanstack/vue-virtual';
import { vOnClickOutside } from '@vueuse/components';
import { get, set, useDebounceFn } from '@vueuse/core';
import { Search } from 'lucide-vue-next';
import { computed, nextTick, ref, toRaw } from 'vue';
import { bookJump } from '../book/action';
import { NoteAction } from '../note/action';
import TextView from './Text.vue';

const { dialogRef, openDialog, closeDialog } = useDialog();

type Title = { name: string }
type Content = { id: string, value: string, eBookId: string, type: string }
type Data = Content | Title

const bookStore = useBookStore()
const noteStore = useNoteStore()
const tagStore = useTagStore()
const boohshelfStore = useBookshelfStore()
const filterTagStore = useFilterNoteStore()
const filterBookshelfStore = useBookFilterStore()

const searchedList = ref<Data[]>([])
const containerRef = ref<HTMLElement | null>(null)

// 虚拟列表
const rowVirtualizerOptions = computed(() => {
  return {
    count: searchedList.value.length,
    estimateSize: () => 100,
    overscan: 30,
    getScrollElement: () => containerRef.value,
  }
})
const rowVirtualizer = useVirtualizer(rowVirtualizerOptions)
const virtualRows = computed(() => rowVirtualizer.value.getVirtualItems())
const totalSize = computed(() => rowVirtualizer.value.getTotalSize())
const measureElement = (el: HTMLElement) => {
  if (!el) {
    return
  }
  setTimeout(() => {
    rowVirtualizer.value.measureElement(el)
  })
  return undefined
}

const initEdite = async () => {
  openDialog()
  await nextTick()
  openDialog()
}

const searchVal = ref<string>('')

const searchBook = (val: string) => {
  return toRaw(bookStore.bookList).filter((item) => item.name.includes(val))
}

let _notes: any[] | null = null
const handleNote = () => {
  if (!_notes) {
    const notes: any[] = []
    for (const item of toRaw(noteStore.noteList)) {
      const sub = NoteAction.getNoteText(item.notes) || []
      const highlightSource = NoteAction.getDomSource(item.domSource).reduce((acc, cur) => cur.text + acc, '')
      if (sub.length) {
        for (const subItem of sub) {
          notes.push({ ...item, noteText: subItem, highlightSource })
        }
      } else {
        notes.push({ ...item, noteText: { value: '' }, highlightSource })
      }

    }
    _notes = notes
  }
}

const searchNote = (val: string) => {
  handleNote()
  return (_notes || []).filter((item) => item.noteText.value.includes(val))
}

const searchHighlight = (val: string) => {
  handleNote()
  return (_notes || []).filter((item) => item.highlightSource.includes(val))
}

const searchTag = (val: string) => {
  return toRaw(tagStore.tagList).filter((item) => item.tagName.includes(val))
}

const searchBookshelf = (val: string) => {
  return toRaw(boohshelfStore.bookshelf).filter((item) => item.name.includes(val))
}

const debouncedFn = useDebounceFn(() => {
  const val = get(searchVal)
  if (val) {
    const res: Data[] = []

    // 搜索书籍
    const book = searchBook(val)
    if (book.length) {
      res.push({ name: t('menu.book') })
      const books = book.map((item) => ({ id: item.id, value: item.name, eBookId: item.id, type: 'book' }))
      res.push(...books)
    }

    // 搜索笔记
    const note = searchNote(val)
    if (note.length) {
      res.push({ name: t('menu.note') })
      const notes = note.map((item) => ({ id: item.id, value: item.noteText.value, eBookId: item.eBookId, type: 'note' }))
      res.push(...notes)
    }

    // 高亮内容
    const highlight = searchHighlight(val)
    if (highlight.length) {
      res.push({ name: t('menu.highlight') })
      const highlights: Data[] = highlight.map((item) => ({ id: item.id, value: item.highlightSource, eBookId: item.eBookId, type: 'highlight' }))
      res.push(...highlights)
    }

    // 搜索标签
    const tag = searchTag(val)
    if (tag.length) {
      res.push({ name: t('tag.name') })
      const tags = tag.map((item) => ({ id: item.id, value: item.tagName, eBookId: item.id, type: 'tag' }))
      res.push(...tags)
    }

    // 搜索书架
    const bookshelf = searchBookshelf(val)
    if (bookshelf.length) {
      res.push({ name: t('book.bookshelf') })
      const bookshelves = bookshelf.map((item) => ({ id: item.id, value: item.name, eBookId: item.id, type: 'bookshelf' }))
      res.push(...bookshelves)
    }

    set(searchedList, res)
  } else {
    set(searchedList, [])
  }
}, 200)

const onSearch = () => {
  debouncedFn()
}

const onClick = ({ type, id, value }: Content) => {
  if (type === 'book') {
    bookJump(id)
  } else if (type === 'note' || type == 'highlight') {
    const note = noteStore.noteList.find((item) => item.id === id)
    if (note) {
      NoteAction.jumpToBook(note)
    }
  } else if (type == 'tag') {
    filterTagStore.setSearchTag({ id, value })
    closeDialog()
    router.push({ name: RouterName.Note })
  } else if (type == 'bookshelf') {
    filterBookshelfStore.setSearchBookshelf({ id, value })
    closeDialog()
    router.push({ name: RouterName.Book })
  }

  closeDialog()
}

initEdite()
</script>

<template>
  <dialog class="modal" ref="dialogRef">
    <div class="modal-box max-w-screen-lg flex flex-col" v-on-click-outside="closeDialog">
      <div class="flex flex-row justify-between items-center mb-5">
        <label class="input input-md flex w-1/2 items-center gap-2">
          <Search />
          <input type="text" class="grow" v-model="searchVal" :placeholder="t('common.search')" @input="onSearch" />
        </label>
        <div @click="closeDialog"> <kbd class="kbd cursor-pointer">Esc</kbd></div>
      </div>
      <div class="min-h-20 flex-1 flex flex-col gap-4 overflow-auto scrollbar-thin" ref="containerRef"
        :style="{ height: `${totalSize}px` }">
        <ul class="menu bg-base-200 rounded-box" v-if="searchedList.length">
          <li v-for="virtualRow in virtualRows" :key="virtualRow.key" :ref="measureElement"
            :data-index="virtualRow.index">
            <h2 class=" font-black" v-if="(searchedList[virtualRow.index] as Title).name">
              {{ (searchedList[virtualRow.index] as Title).name }}
            </h2>
            <template v-else>
              <TextView @click="onClick((searchedList[virtualRow.index] as Content))"
                :value="(searchedList[virtualRow.index] as Content).value" :search="searchVal" />
              <div class="divider mt-0 hover:bg-base-200"></div>
            </template>
          </li>
        </ul>
        <div v-else-if="searchVal" class="flex justify-center items-center h-full mt-10 ">
          <div class="text-center">
            <div class="text-3xl">🗑📢</div>
            <div class="text-sm mt-2 text-base-content/70">{{ t('common.noRegList') }}</div>
          </div>
        </div>
        <div v-else class="flex justify-center items-center h-full mt-10 ">
          <div class="text-center">
            <div class="text-3xl">🔍</div>
            <div class="text-sm mt-2 text-base-content/70">{{ t('search.searchRange') }}</div>
          </div>
        </div>
      </div>
      <div class="modal-action pt-4">
        <button class="btn btn-outline " @click="closeDialog">{{ t('common.close') }}</button>
      </div>
    </div>
  </dialog>
</template>