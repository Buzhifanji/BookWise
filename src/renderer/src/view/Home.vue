<script setup lang="ts">
import { Book } from '@renderer/batabase';
import { BookReadTimeAction, ImgView } from '@renderer/components';
import { t } from '@renderer/data';
import { bookJump } from '@renderer/hooks';
import { getInterval, remToPx } from '@renderer/shared';
import { useBookStore, useContentCantianerStore, useNoteStore } from '@renderer/store';
import { get, set, useToggle } from '@vueuse/core';
import dayjs from 'dayjs';
import { Annoyed, CircleCheckBig, Clock, MoveUp, NotebookPen } from 'lucide-vue-next';
import { computed, ref } from 'vue';

const bookshelfWidht = 120
const bookshelfHeight = 100
const statistical = ref<{
  title: string
  desc: string
  total: number
  percentage: string
  detailTitle: string
  detailNum: number
  detailUit: string
  icon: any
  isUp: boolean
}[]>([])
const store = useContentCantianerStore()
const totalRecentBook = ref<Book[]>([])
const totalLoveBook = ref<Book[]>([])
const [loading, setLoading] = useToggle(false)
const bookStore = useBookStore()
const noteStore = useNoteStore()

function handlePercentage(num1: number, num2: number) {
  if (num1 === 0) {
    if (num2 === 0) {
      return 0
    } else {
      return 1
    }
  }

  if (num2 === 0) {
    return 0
  }

  const percentage = +(((num1 - num1) / num1) * 100).toFixed(4)
  return percentage
}

const isThisMonth = (time: number) => dayjs(time).month() === dayjs().month()
const isLastMonth = (time: number) => dayjs(time).month() === dayjs().month() - 1

const toStr = (val: number) => (val * 100).toFixed(2) + '%'

async function init() {
  try {
    setLoading(true)
    const allime = await BookReadTimeAction.getAll()
    const allBook = bookStore.bookList.filter(item => !item.isDelete)
    allBook.sort((a, b) => b.updateTime - a.updateTime)

    const allNotes = noteStore.noteList

    // 在读
    const allReadingBook = allBook.filter(item => item.count !== 0)
    const allReading = allReadingBook.length
    const thisMouthReading = allReadingBook.filter(item => isThisMonth(item.updateTime)).length
    const lastMouthReading = allReadingBook.filter(item => isLastMonth(item.updateTime)).length
    const readPercentage = handlePercentage(lastMouthReading, thisMouthReading)

    // 已读
    const allReadedBook = allBook.filter(item => item.isReadDone)
    const allReaded = allReadedBook.length
    const thisMouthReaded = allReadedBook.filter(item => isThisMonth(item.updateTime)).length
    const lastMouthReaded = allReadedBook.filter(item => isLastMonth(item.updateTime)).length
    const readedPercentage = handlePercentage(lastMouthReaded, thisMouthReaded)

    // 笔记
    const allNote = allNotes.length
    const thisMouthNote = allNotes.filter(item => isThisMonth(item.createTime)).length
    const lastMouthNote = allNotes.filter(item => isLastMonth(item.createTime)).length
    const notePercentage = handlePercentage(lastMouthNote, thisMouthNote)

    // 时长
    const allReadTime = allime.reduce((pre, cur) => pre + getInterval(cur.startTime, cur.endTime), 0)
    const thisMouthReadTime = allime.filter(item => isThisMonth(item.creatTime)).reduce((pre, cur) => pre + getInterval(cur.startTime, cur.endTime), 0)
    const lastMouthReadTime = allime.filter(item => isLastMonth(item.creatTime)).reduce((pre, cur) => pre + getInterval(cur.startTime, cur.endTime), 0)
    const readTimePercentage = handlePercentage(lastMouthReadTime, thisMouthReadTime)

    set(statistical, [
      {
        title: 'statistics.reading',
        desc: 'statistics.total',
        total: allReading,
        percentage: toStr(readPercentage),
        detailTitle: 'statistics.thisMouthReading',
        detailNum: thisMouthReading,
        detailUit: 'statistics.bookUnit',
        icon: Annoyed,
        isUp: readPercentage > 0 ? true : false,
      },
      {
        title: 'statistics.readed',
        desc: 'statistics.total',
        total: allReaded,
        percentage: toStr(readedPercentage),
        detailTitle: 'statistics.thisMouthReaded',
        detailNum: thisMouthReaded,
        detailUit: 'statistics.bookUnit',
        icon: CircleCheckBig,
        isUp: readedPercentage > 0 ? true : false,
      },
      {
        title: 'menu.note',
        desc: 'statistics.total',
        total: allNote,
        percentage: toStr(notePercentage),
        detailTitle: 'statistics.thisMouthNote',
        detailNum: thisMouthNote,
        detailUit: 'statistics.noteUnit',
        icon: NotebookPen,
        isUp: notePercentage > 0 ? true : false,
      },
      {
        title: 'statistics.readTime',
        desc: 'statistics.readTotalTime',
        total: allReadTime,
        percentage: toStr(readTimePercentage),
        detailTitle: 'statistics.thisMouthReadTime',
        detailNum: thisMouthReadTime,
        detailUit: 'statistics.readTimeUnit',
        icon: Clock,
        isUp: readTimePercentage > 0 ? true : false,
      },
    ])

    set(totalRecentBook, allReadingBook.slice(0, 100))
    set(totalLoveBook, allBook.filter(item => item.isLove).slice(0, 100))
  } catch (err) {

  } finally {
    setLoading(false)
  }
}

// 最近在读
const recentBook = computed(() => {
  const count = parseInt(((store.width) / (bookshelfWidht + remToPx(2.5))).toString())
  return get(totalRecentBook).slice(0, count)
})

// 我的最爱
const loveBook = computed(() => {
  const count = parseInt(((store.width) / (bookshelfWidht + remToPx(2.5))).toString())
  return get(totalLoveBook).slice(0, count)
})


init()
</script>

<template>
  <div class="p-6  h-full overflow-auto absolute inset-0 scrollbar-thin">
    <div class="grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
      <template v-if="loading">
        <div class="skeleton h-40 w-full" v-for="_ in 4"></div>
      </template>
      <template v-else>
        <div class="card bg-base-100 shadow" v-for="item in statistical">
          <div class="card-body gap-2">
            <div class="flex items-start justify-between gap-2 text-sm">
              <div>
                <p class="font-medium text-base-content/70">{{ t(item.title) }}</p>
                <div class="mt-4 flex items-center gap-2">
                  <h5 class="inline text-2xl/none font-semibold">
                    {{ t(item.desc) }}
                    <span class="text-success mx-1">{{ item.total }}</span>
                    <span class="text-success ">{{ t(item.detailUit) }}</span>
                  </h5>
                </div>
              </div>
              <div class="rounded bg-base-200 p-2 ">
                <component :is="item.icon" class="w-4 h-4" />
              </div>
            </div>
            <p class="text-sm font-medium ">
              <span class="text-base-content/60">
                {{ t(item.detailTitle) }}
                <span class="text-success mx-[2px]">{{ item.detailNum }}</span>
                {{ t(item.detailUit) }}
              </span>
            <div aria-label="Badge" v-if="item.isUp"
              class="badge gap-1 border-0 bg-success/10 py-3 text-xs font-semibold text-success badge-sm ml-1.5">
              <MoveUp class="w-2.5 h-2.5" />{{ item.percentage }}
            </div>
            <div aria-label="Badge" v-else
              class="badge gap-1 border-0 bg-error/10 py-3 text-xs font-semibold text-error badge-sm ml-1.5">
              <MoveUp class="w-2.5 h-2.5" />{{ item.percentage }}
            </div>
            </p>
          </div>
        </div>
      </template>
    </div>
    <div class="mt-6 card bg-base-100 card-bordered">
      <div class="card-body ">
        <h2 class="card-title">{{ t('statistics.currentReading') }}</h2>
        <div class="w-full min-h-44 flex flex-row gap-6 overflow-hidden">
          <template v-if="loading">
            <div class="skeleton h-40 w-full mt-4"></div>
          </template>
          <template v-else>
            <template v-if="recentBook.length > 0">
              <div v-for="item in recentBook" class="cursor-pointer" @click="bookJump(item.id, item)">
                <div class="rounded over-hidden "
                  :style="{ width: `${bookshelfWidht}px`, height: `${bookshelfHeight + remToPx(3.5)}px` }">
                  <ImgView :id="item.id" />
                </div>
                <div class="line-clamp-2 mx-1 mb-1 text-sm" :style="{ width: `${bookshelfWidht}px`, }">{{ item.name }}
                </div>
              </div>
            </template>
            <div class="flex justify-center items-center w-full" v-else>
              <div class="btn">
                <div class="badge">{{ t('common.empty') }}</div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
    <div class="mt-6 card bg-base-100 card-bordered">
      <div class="card-body ">
        <h2 class="card-title">{{ t('statistics.myLove') }}</h2>
        <div class="w-full min-h-44 flex flex-row gap-6 overflow-hidden">
          <template v-if="loading">
            <div class="skeleton h-40 w-full mt-4"></div>
          </template>
          <template v-else>
            <template v-if="loveBook.length > 0">
              <div v-for="item in loveBook" class="cursor-pointer" @click="bookJump(item.id, item)">
                <div class="rounded over-hidden "
                  :style="{ width: `${bookshelfWidht}px`, height: `${bookshelfHeight + remToPx(3.5)}px` }">
                  <ImgView :id="item.id" />
                </div>
                <div class="line-clamp-2 mx-1 mb-1 text-sm" :style="{ width: `${bookshelfWidht}px`, }">{{ item.name }}
                </div>
              </div>
            </template>
            <div class="flex justify-center items-center w-full" v-else>
              <div class="btn">
                <div class="badge">{{ t('common.empty') }}</div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>