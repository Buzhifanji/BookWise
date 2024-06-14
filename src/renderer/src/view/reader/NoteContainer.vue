<script setup lang="ts">
import { Book } from '@renderer/batabase';
import { NoteAction } from '@renderer/components';
import { convertUint8ArrayToURL } from '@renderer/shared';
import { useToggle } from '@vueuse/core';
import dayjs from 'dayjs';
import { ref } from 'vue';

interface Props {
  book: Book,
}

const props = defineProps<Props>()

// tab
const activeTab = ref('book')
const tabList = [
  { name: 'book', label: '书籍' },
  { name: 'note', label: '笔记' },
]
const changeTab = (tab: string) => {
  activeTab.value = tab
}

const notes = NoteAction.observableByEBookId(props.book.id)

const removeOneNote = () => {

}

// 鼠标选中效果
const textOpacity = { '--tw-text-opacity': 0.6 };
const [bgOpacity, setBgOpacity] = useToggle(1)
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
    <div class="flex-1 transition ease-in-out p-3">
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
      <div v-else class="h-full bg-base-100 ">
        <div v-for="item in notes"
          class="card bg-base-200 rounded-md cursor-pointer mb-3 hover:bg-info hover:text-info-content"
          :style="{ '--tw-bg-opacity': bgOpacity }" @mouseenter="setBgOpacity(0.3)" @mouseleave="setBgOpacity(1)">
          <div class="card-body p-2">
            <!-- 高亮内容 -->
            <div class="flex flex-row gap-4">
              <div class="flex">
                <div class="divider divider-primary h-full w-[3px] flex-col m-0 py-1"></div>
              </div>
              <blockquote>
                <p v-for="sub in NoteAction.getDomSource(item.domSource)">
                  {{ sub.text }}
                </p>
              </blockquote>
            </div>
            <div class="grid grid-cols-1 divide-y">
              <!-- 笔记列表 -->
              <div v-for="sub in NoteAction.getNoteText(item.notes)"
                class="bg-base-200 p-3 hover:bg-info hover:text-info-content" :style="{ '--tw-bg-opacity': bgOpacity }">
                <div class="flex flex-row justify-between items-center mb-1">
                  <div class="stat-desc">{{ dayjs(sub.time).format('L LT') }}</div>
                  <div>
                    <button class="btn btn-outline btn-error btn-xs" @click="removeOneNote()">删除</button>
                  </div>
                </div>
                <p>{{ sub.value }}</p>
              </div>
            </div>
            <div class="flex flex-row-reverse">
              <button class="btn btn-sm btn-outline btn-primary">编辑</button>
            </div>
          </div>
        </div>
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
</style>