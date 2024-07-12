<script setup lang="ts">
import { BookAudio } from '@renderer/batabase';
import { BookAudioAction, RingLoadingView } from '@renderer/components';
import { TTSbus } from '@renderer/hooks';
import { domScrollToView, spliteSentence } from '@renderer/shared';
import { useBookPageStore, useTTSStore } from '@renderer/store';
import { edgeTSS } from '@renderer/tts';
import { get, set, useDebounceFn, useToggle } from '@vueuse/core';
import { Howler } from 'howler';
import SparkMD5 from 'spark-md5';
import { v4 as uuidv4 } from 'uuid';
import { defineProps, onUnmounted, ref, watchEffect, withDefaults } from 'vue';
import { Sound } from './sound';
interface Props {
  section: any[],
  toc: any[],
  bookId: string,
  page?: number,
}

const props = withDefaults(defineProps<Props>(), {
  section: () => [],
  toc: () => [],
  bookId: '',
  page: 0,
})

const TTSStore = useTTSStore()
const bookPageStore = useBookPageStore()
const [loading, setLoading] = useToggle(false)

const isSupport = ref(props.section.length > 0) // 是否支持朗读
const textList = ref<string[]>([]) // 文本列表
const activeText = ref(0) // 当前选中的文本
const activePage = ref(props.page) // 当前选中的目录
const catalogRef = ref<HTMLDivElement>() // 目录容器
const contentRef = ref<HTMLDivElement>() // 内容容器
const sound = new Sound()

const audiosMap = new Map<string, BookAudio>()

const hasNextCatalog = () => get(activePage) < props.section.length - 1 // 是否有下章节

async function loadAudioFromBD() {
  try {
    const res = (await BookAudioAction.findByBookId(props.bookId)).filter(item => item.voice === get(TTSStore.voice))
    for (const item of res) {
      audiosMap.set(item.textHash, item)
    }
  } catch (_) {
  }
}

async function loadAudioFromNet(textHash: string, input: string, voice: string) {
  try {
    if (!audiosMap.has(textHash)) {
      const connectId = uuidv4().replaceAll('-', '') as string
      const res = await edgeTSS({ payload: { input, connectId, options: { voice } } })
      const data: BookAudio = { id: uuidv4(), voice, textHash, bookId: props.bookId, content: res }
      await BookAudioAction.add(data)
      audiosMap.set(textHash, data)
    }
  } catch (err) {
    console.error('createTTS error', err)
  }
}


// 加载当前章节语言数据
async function loadSectionAudio(data: string[], isPlay = false) {
  if (data.length === 0) return

  for (const [index, item] of data.entries()) {
    const hash = SparkMD5.hash(item)
    await loadAudioFromNet(hash, item, TTSStore.voice)

    // 第一次需要播放音频
    if (isPlay && index === 0) {
      const buffer = audiosMap.get(hash)?.content
      if (buffer) {
        sound.play(buffer)
        setLoading(false)
      } else {
        console.warn('数据丢失了')
      }
    }
  }
}


// 目录
const jumpPage = (page: number) => {
  sound.clear()
  set(activePage, page)
  set(activeText, 0)
  const val = handleText(page)
  set(textList, val)
  loadSectionAudio(val, true)
}
const onCatalog = (e: any) => {
  sound.clear()
  jumpPage(e.page)
}
const catalogScroll = useDebounceFn((_: number) => {
  domScrollToView(get(catalogRef), 'a.active')
}, 100)
watchEffect(() => {
  catalogScroll(get(activePage))
})

// 内容
const contentScroll = useDebounceFn((_: number) => {
  domScrollToView(get(contentRef), 'p.selection-info')
}, 100)
watchEffect(() => {
  contentScroll(get(activeText))
})

function changeActiveText(index: number) {
  sound.clear()
  set(activeText, index)
  playIndex(index)
}

function extractText(htmlString: string): string {
  return htmlString
    .replace(/<small[^>]*?>(.*?)<\/font>/gi, '') // 清空备注元素标签
    .replace(/<[^>]+>/g, '')
    .replace(/________________________________/g, '')
    .trim();
}

function handleText(index: number) {
  const data = props.section[index]
  if (data) {
    return spliteSentence(extractText(data.html))
  }
  return [] as string[]
}


async function playIndex(index: number) {
  const hash = SparkMD5.hash(textList.value[index])
  const buffer = audiosMap.get(hash)?.content
  if (buffer) {
    sound.play(buffer)
  } else {
    await loadAudioFromNet(hash, textList.value[index], TTSStore.voice)
    const res = audiosMap.get(hash)?.content
    if (res) {
      sound.play(res)
    } else {
      console.warn('数据丢失了')
    }
  }
}

function loadNextSection() {
  if (hasNextCatalog()) {
    const nextText = handleText(get(activePage) + 1)
    loadSectionAudio(nextText, false)
  }
}

const zeroPoint = 10
TTSbus.on((val) => {
  if (val === 'next') {
    const total = get(textList).length
    const index = get(activeText)
    if (total <= zeroPoint || total - index <= zeroPoint) {
      // 到达临界点，通知加载下一章音频
      loadNextSection()
    }

    if (index >= total - 1) {
      // 本章最后一句，需要跳转到下一章
      const page = get(activePage)
      if (page < props.section.length - 1) {
        jumpPage(page + 1)
      }
    } else {
      set(activeText, get(activeText) + 1)
      playIndex(get(activeText))
    }
  }
})

async function init() {
  setLoading(true)
  try {
    Howler.unload()
    set(activePage, get(bookPageStore.page))
    set(textList, handleText(get(activePage))) // 加载并切割文本内容
    await loadAudioFromBD() // 加载本地音频
    await loadSectionAudio(get(textList), true) // 加载章节音频
    // 预先加载下一章内容
    loadNextSection()
  } catch (err) {
    console.error('init error', err)
  } finally {
    setLoading(false)
  }
}

if (get(isSupport)) {
  init()
}

onUnmounted(() => {
  sound.clear()
})

</script>

<template>
  <div class="hero bg-base-200 rounded-md h-full" v-if="!isSupport">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">朗读错误</h1>
        <p class="py-6">
          由于提取不到文本内容，此书不支持朗读.
        </p>
      </div>
    </div>
  </div>
  <template v-else>
    <RingLoadingView v-if="loading" />
    <template v-else>
      <div class="catalog-wrapper bg-base-100 overflow-auto hover:scrollbar-thin scrollbar-none" ref="catalogRef">
        <ExpandTreeView :data="toc" :active="activePage" @click="onCatalog" />
      </div>
      <div class="prose px-2 w-full max-w-full overflow-auto hover:scrollbar-thin scrollbar-none cursor-pointer"
        ref="contentRef">
        <p v-for="item, index in textList" class="px-2 hover:bg-base-300/60"
          :class="{ 'selection-info': index === activeText }" @click="changeActiveText(index)">{{ item }}</p>
      </div>
    </template>
  </template>
</template>

<style scoped>
.catalog-wrapper {
  -----read-alound-catalog-bar-width: 16rem;
  width: var(-----read-alound-catalog-bar-width);
  transition: all .3s;
  position: sticky;
  bottom: 0;
  top: 0;
  height: 100%;
  min-width: 16rem;
  border-inline-end-width: 1px;
  --tw-border-opacity: 1;
  border-color: var(--fallback-b2, oklch(var(--b2) / var(--tw-border-opacity)));
}

.catalog-wrapper.hide {
  margin-inline-start: calc(var(-----read-alound-catalog-bar-width)* -1);
}
</style>