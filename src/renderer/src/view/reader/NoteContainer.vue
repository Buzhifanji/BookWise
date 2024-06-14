<script setup lang="ts">
import { Book } from '@renderer/batabase';
import { convertUint8ArrayToURL } from '@renderer/shared';
import dayjs from 'dayjs';
import { ref } from 'vue';

interface Props {
  book: Book,
}

defineProps<Props>()

// tab
const activeTab = ref('book')
const tabList = [
  { name: 'book', label: '书籍' },
  { name: 'note', label: '笔记' },
]
const changeTab = (tab: string) => {
  activeTab.value = tab
}

</script>

<template>
  <div class="left-note-wrapper bg-base-100 flex flex-col">
    <div role="tablist" class="tabs tabs-boxed rounded-none rounded-b">
      <a role="tab" class="tab transition ease-in-out " :class="{ 'tab-active': activeTab === item.name }"
        @click="changeTab(item.name)" v-for="item in tabList">{{ item.label }}</a>
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
      <div v-else>
        note
      </div>
    </div>
  </div>
</template>

<style scoped>
.left-note-wrapper {
  --rightbar-width: 20rem;
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