<script setup lang="ts">
import { Book } from '@renderer/batabase';
import { NoteAction } from '@renderer/components';
import { useBgOpacity } from '@renderer/hooks';
import { $, convertUint8ArrayToURL } from '@renderer/shared';
import { useVirtualizer } from '@tanstack/vue-virtual';
import dayjs from 'dayjs';
import { computed, ref } from 'vue';
import NoteListView from './toolbar/NoteList.vue';
import SourceListView from './toolbar/SourceList.vue';

interface Props {
  book: Book,
}

const props = defineProps<Props>()

// tab
const activeTab = ref('book')
const changeTab = (tab: string) => {
  activeTab.value = tab
}

const notes = NoteAction.observableByEBookId(props.book.id)

const removeOneNote = () => {

}

// 鼠标选中效果
const { bgOpacity, indexBgOpacity, hoverAction } = useBgOpacity()

// 虚拟列表
const containerRef = ref<HTMLElement | null>(null)
const rowVirtualizerOptions = computed(() => {
  return {
    count: notes.value?.length || 0,
    estimateSize: () => 400,
    overscan: 10,
    getScrollElement: () => containerRef.value,
  }
})
const rowVirtualizer = useVirtualizer(rowVirtualizerOptions)
const virtualRows = computed(() => rowVirtualizer.value.getVirtualItems())
const totalSize = computed(() => rowVirtualizer.value.getTotalSize())
const measureElement = (el) => {
  if (!el) {
    return
  }
  setTimeout(() => {
    rowVirtualizer.value.measureElement(el)
  })
  return undefined
}

// 编辑
const openEidteBar = (index: number) => {
  console.log(index)
  const dom = $(`.note-item[data-index='${index}']`) as HTMLElement
  if (dom) {

  }
}
</script>

<template>
  <div class="left-note-wrapper bg-base-100 flex flex-col">
    <div role="tablist" class="tabs tabs-boxed rounded-none rounded-b">
      <a role="tab" class="tab transition ease-in-out " :class="{ 'tab-active': activeTab === 'book' }"
        @click="changeTab('book')">书籍</a>

      <a role="tab" class="tab transition ease-in-out " :class="{ 'tab-active': activeTab === 'note' }"
        @click="changeTab('note')" v-if="notes?.length">
        <div class="indicator w-full justify-center">
          <span class="indicator-item indicator-bottom badge badge-secondary right-[5px]">
            {{ notes.length >= 100 ? '99+' : notes.length }}
          </span>
          <div>笔记</div>
        </div>
      </a>
      <a role="tab" class="tab transition ease-in-out " :class="{ 'tab-active': activeTab === 'note' }"
        @click="changeTab('note')" v-else>笔记</a>
    </div>
    <div class="flex-1 transition ease-in-out p-3 relative">
      <!-- 书籍信息 -->
      <div class="flex flex-col" v-if="activeTab === 'book'">
        <div class="flex flex-row gap-3">
          <div class="avatar">
            <div class="w-28 rounded">
              <img :src="convertUint8ArrayToURL(book.cover)" />
            </div>
          </div>
          <div class="flex-1 flex flex-col gap-2 overflow-hidden">
            <div class="font-bold whitespace-normal">
              <span>{{ book.name }}</span>
            </div>
            <div class="stat-title whitespace-normal">{{ book.author }}</div>
          </div>
        </div>
        <div class="flex gap-4 ml-3 mt-5 mb-2">
          <div>出版商</div>
          <div class="stat-title">{{ book.publisher }}</div>
        </div>
        <div class="flex flex-nowrap gap-4 ml-3 mb-2  overflow-hidden">
          <div class="flex-none">出版时间</div>
          <div class="stat-title shrink ">{{ book.publishTime ? dayjs(book.publishTime).format('L LT') : '' }}</div>
        </div>
        <div class="flex gap-4 ml-3 mb-2">
          <div>创建时间</div>
          <div class="stat-title ">{{ dayjs(book.createTime).format('L LT') }}</div>
        </div>
        <div class="flex gap-4 ml-3 mb-2">
          <div>更新时间</div>
          <div class="stat-title ">{{ dayjs(book.updateTime).format('L LT') }}</div>
        </div>
        <div class="flex gap-4 ml-3 mb-2">
          <div>大小</div>
          <div class="stat-title">{{ book.size }}</div>
        </div>
        <div class="flex gap-4 ml-3 mb-2">
          <div>页数</div>
          <div class="stat-title">{{ book.pages }}</div>
        </div>

      </div>
      <!-- 笔记 -->
      <div v-else class="absolute inset-0 ">
        <div class="h-full p-3 bg-base-100 overflow-y-auto scrollbar-none hover:scrollbar-thin" ref="containerRef">
          <div class="relative w-full" :style="{ height: `${totalSize}px` }">
            <div class="absolute top-0 left-0 w-full "
              :style="{ transform: `translateY(${virtualRows[0]?.start ?? 0}px)` }">
              <div v-for="virtualRow in virtualRows" :key="virtualRow.key" class="note-item"
                :data-index="virtualRow.index" :ref="measureElement">
                <div class="card bg-base-200 rounded-md cursor-pointer mb-3 hover:bg-info hover:text-info-content"
                  :style="{ '--tw-bg-opacity': indexBgOpacity(virtualRow.index) }"
                  @mouseenter="hoverAction(0.3, virtualRow.index)" @mouseleave="hoverAction(1, -1)">
                  <div class="card-body p-2">
                    <!-- 高亮内容 -->
                    <SourceListView :data="NoteAction.getDomSource(notes[virtualRow.index].domSource)"
                      :opacity="indexBgOpacity(virtualRow.index)" />

                    <!-- 笔记列表 -->
                    <div class="grid grid-cols-1 divide-y">
                      <NoteListView :data="NoteAction.getNoteText(notes[virtualRow.index].notes)"
                        :opacity="indexBgOpacity(virtualRow.index)" />
                    </div>
                    <div class="flex flex-row-reverse">
                      <button class="btn btn-sm btn-outline btn-primary"
                        @click="openEidteBar(virtualRow.index)">编辑</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        <!-- 笔记工具栏 -->
        <!-- <div class="fixed inset-0">
          <div class="card bg-base-100 absolute top-10  select-none cursor-pointer right-80 bar-shadow">
            <div class="card-body">
              <div class="flex flex-row justify-between items-center mb-2">
                <h3 class="font-bold text-lg">我的笔记</h3>
                <div> <kbd class="kbd">Esc</kbd></div>
              </div>

            </div>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<style scoped>
.left-note-wrapper {
  --rightbar-width: 26rem;
  width: var(--rightbar-width);
  transition: all .3s;
  position: sticky;
  bottom: 0;
  top: 0;
  height: 100vh;
  min-width: 15rem;
  border-inline-start-width: 1px;
  --tw-border-opacity: 1;
  border-color: var(--fallback-b2, oklch(var(--b2) / var(--tw-border-opacity)));
}

.left-note-wrapper.hide {
  margin-inline-end: calc(var(--rightbar-width)* -1);
}

.bar-shadow {
  box-shadow: 0 10px 50px 0 rgba(0, 0, 0, .1);
}
</style>