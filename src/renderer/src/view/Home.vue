<script setup lang="ts">
import { Book } from '@renderer/batabase';
import { BookAction } from '@renderer/components';
import { convertUint8ArrayToURL, remToPx } from '@renderer/shared';
import { useContentCantianerStore } from '@renderer/store';
import { Annoyed, CircleCheckBig, Clock, MoveUp, NotebookPen } from 'lucide-vue-next';
import { computed, ref } from 'vue';

const bookshelfWidht = 120
const bookshelfHeight = 100
const statistical = [
  { title: '在读', desc: '175本在读', percentage: '21.2%', detailTitle: '今年在读', detailNum: 19, detailUit: '本', icon: Annoyed, isUp: true },
  { title: '已读', desc: '15本已读完', percentage: '21.2%', detailTitle: '今年在读完', detailNum: 9, detailUit: '本', icon: CircleCheckBig, isUp: true },
  { title: '笔记', desc: '2057个笔记', percentage: '21.2%', detailTitle: '本月新增', detailNum: 123, detailUit: '个', icon: NotebookPen, isUp: false },
  { title: '时长', desc: '386.75小时', percentage: '21.2%', detailTitle: '本月', detailNum: 5.5, detailUit: '小时', icon: Clock, isUp: false },
]
const store = useContentCantianerStore()
const sortedBook = ref<Book[]>([])

async function init() {
  const allBook = await BookAction.getAll()
  allBook.sort((a, b) => b.updateTime - a.updateTime)
  sortedBook.value = allBook.slice(0, 100)
}

// 最近在读
const recentBook = computed(() => {
  const count = parseInt(((store.width) / (bookshelfWidht + remToPx(2.5))).toString())
  return sortedBook.value.slice(0, count)
})


init()
</script>

<template>
  <div class="p-6  h-full overflow-auto absolute inset-0">
    <div class="grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
      <div aria-label="Card" class="card bg-base-100 shadow" v-for="item in statistical">
        <div class="card-body gap-2">
          <div class="flex items-start justify-between gap-2 text-sm">
            <div>
              <p class="font-medium text-base-content/70">{{ item.title }}</p>
              <div class="mt-4 flex items-center gap-2">
                <h5 class="inline text-2xl/none font-semibold">{{ item.desc }}</h5>
                <div aria-label="Badge" v-if="item.isUp"
                  class="badge gap-1 border-0 bg-success/10 py-3 text-xs font-semibold text-success badge-sm">
                  <MoveUp class="w-2.5 h-2.5" />{{ item.percentage }}
                </div>
                <div aria-label="Badge" v-else
                  class="badge gap-1 border-0 bg-error/10 py-3 text-xs font-semibold text-error badge-sm">
                  <MoveUp class="w-2.5 h-2.5" />{{ item.percentage }}
                </div>
              </div>
            </div>
            <div class="rounded bg-base-200 p-2 ">
              <component :is="item.icon" class="w-4 h-4" />
            </div>
          </div>
          <p class="text-sm font-medium">
            <span class="ms-1.5 text-base-content/60">{{ item.detailTitle }}
              <span class="text-success">{{ item.detailNum }}
              </span>{{ item.detailUit }}</span>
          </p>
        </div>
      </div>
    </div>
    <div class="mt-6 card bg-base-100 card-bordered">
      <div class="card-body ">
        <h2 class="card-title">最近在读</h2>
        <div class="w-full min-h-44 flex flex-row gap-6 overflow-hidden">
          <div v-for="item in recentBook" class="cursor-pointer">
            <div class="rounded over-hidden "
              :style="{ width: `${bookshelfWidht}px`, height: `${bookshelfHeight + remToPx(3.5)}px` }">
              <img :src="convertUint8ArrayToURL(item.cover)" class="w-full h-full rounded object-cover" alt="书籍封面">
            </div>
            <div class="line-clamp-2 mx-1 mb-1 text-sm" :style="{ width: `${bookshelfWidht}px`, }">{{ item.name }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-6 card bg-base-100 card-bordered">
      <div class="card-body ">
        <h2 class="card-title">我的最爱</h2>
        <div class="w-full min-h-44 flex flex-row gap-6 overflow-hidden">
          <div v-for="item in recentBook" class="cursor-pointer">
            <div class="rounded over-hidden "
              :style="{ width: `${bookshelfWidht}px`, height: `${bookshelfHeight + remToPx(3.5)}px` }">
              <img :src="convertUint8ArrayToURL(item.cover)" class="w-full h-full rounded object-cover" alt="书籍封面">
            </div>
            <div class="line-clamp-2 mx-1 mb-1 text-sm" :style="{ width: `${bookshelfWidht}px`, }">{{ item.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>