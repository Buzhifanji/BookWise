<script setup lang="ts">
import { BookAudio } from '@renderer/batabase';
import { BookAudioAction, RingLoadingView, Select } from '@renderer/components';
import { langs } from '@renderer/data';
import { BookRender, TTSbus } from '@renderer/hooks';
import { domScrollToView, spliteSentence } from '@renderer/shared';
import { useBookStore, useTTSStore } from '@renderer/store';
import { edgeTSS } from '@renderer/tts';
import { voiceList } from '@renderer/tts/data';
import { get, onKeyStroke, set, useDebounceFn, useToggle } from '@vueuse/core';
import { Howler } from 'howler';
import { FastForward, Rewind, StepBack, StepForward, Triangle, Volume1, VolumeX } from 'lucide-vue-next';
import SparkMD5 from 'spark-md5';
import { v4 as uuidv4 } from 'uuid';
import { computed, defineProps, onUnmounted, ref, watchEffect, withDefaults } from 'vue';
import BookLanguage from './bookLanguage.vue';
import { Sound } from './sound';

interface Props {
  bookId: string,
  page?: number,
}

const props = withDefaults(defineProps<Props>(), {
  bookId: '',
  page: 0,
})

const TTSStore = useTTSStore()
const bookStore = useBookStore()
const [loading, setLoading] = useToggle(false)

const bookInfo = computed(() => bookStore.bookList.find(item => item.id === props.bookId))
const toc = computed(() => handleToc(get(BookRender.bookToc)))
const isSupport = computed(() => get(BookRender.sectionNum) > 0) // 是否支持朗读
const textList = ref<string[]>([]) // 文本列表
const activeText = ref(0) // 当前选中的文本
const activePage = ref(props.page) // 当前选中的目录
const catalogRef = ref<HTMLDivElement>() // 目录容器
const contentRef = ref<HTMLDivElement>() // 内容容器
const language = ref('') // 语言
const languageList = langs.slice(0, langs.length - 2)
languageList.push({ id: 'zh', value: '中文' })
const sound = new Sound()
const isPlaying = sound.isPlaying
const volume = sound.volume
const isMute = sound.isMute
const textOpacity = { '--tw-text-opacity': 0.6 };

// 选择书本语言
const bookLanguageRef = ref<InstanceType<typeof BookLanguage>>()
const closeBookLanguage = (id: string) => {
  if (id.startsWith('zh')) {
    set(language, 'zh')
  } else {
    set(language, id)
  }
}
watchEffect(() => {
  const book = get(bookInfo)
  if (book && book.language) {
    if (book.language) {
      closeBookLanguage(book.language)
    } else {
      bookLanguageRef.value?.open()
    }
  }
})


const voice = ref('')
const voices = computed(() => {
  const lang = get(language)
  if (lang) {
    const list = Object.keys(voiceList).map(key => ({ id: key, value: voiceList[key] }))
    const res = list.filter(item => item.id.startsWith(lang.toLocaleLowerCase()))
    if (res.length) {
      set(voice, res[0].id)
      return res
    } else {
      const res = window.speechSynthesis.getVoices().filter((v) => v.lang.includes(lang)).map((v) => {
        return { id: v.name, value: v.name }
      })
      if (res.length) {
        set(voice, res[0].id)
      }
      return res
    }

  }
  return []
})


const audiosMap = new Map<string, BookAudio>()
const hasNextCatalog = () => get(activePage) < get(BookRender.sectionNum) - 1 // 是否有下章节
const hasVoice = () => {
}

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
      sound.clear()
      if (buffer) {
        sound.play(buffer)
        setLoading(false)
      } else {
        sound.play(get(textList)[get(activeText)])
        // console.warn('数据丢失了')
      }
    }
  }
}


// 目录
function handleToc(toc: any[]) {
  const result: any[] = JSON.parse(JSON.stringify(toc));
  const pageSet = new Set<string>()
  const eachToc = (data: any[]) => {
    for (const item of data) {
      if (pageSet.has(item.page)) {
        item.subitems = null
      } else {
        pageSet.add(item.page)
        if (Array.isArray(item.subitems)) {
          eachToc(item.subitems)
        }
      }

    }
  }
  eachToc(result)

  return result
}
const onCatalog = (e: any) => {
  changeActionSection(e.page)
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

function extractText(htmlString: string): string {
  return htmlString
    .replace(/<small[^>]*?>(.*?)<\/font>/gi, '') // 清空备注元素标签
    .replace(/<[^>]+>/g, '')
    .replace(/________________________________/g, '')
    .trim();
}

async function handleText(index: number) {
  const data = await BookRender.getSection(index)
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
      sound.play(get(textList)[get(activeText)])
      // console.warn('数据丢失了')
    }
  }
}

function playAction() {
  if (get(isPlaying)) {
    sound.toggle()
  } else {

  }
}

async function loadNextSection() {
  if (hasNextCatalog()) {
    const nextText = await handleText(get(activePage) + 1)
    loadSectionAudio(nextText, false)
  }
}

// 根据索引切换句子
function changeActiveSentence(index: number) {
  sound.clear()
  set(activeText, index)
  playIndex(index)
}

// 下一句
function nextSentence() {
  const index = get(activeText)
  if (index >= get(textList).length - 1) {
    // 到末尾了，需要跳转到下一章
    nextSection()
  } else {
    changeActiveSentence(index + 1)
  }
}

// 上一句
function prewSentence() {
  const index = get(activeText)
  if (index <= 0) {
    prewSection()
  } else {
    changeActiveSentence(index - 1)
  }
}

// 切换章节
async function changeActionSection(index: number) {
  sound.clear()
  set(activePage, index)
  set(activeText, 0)
  const val = await handleText(index)
  set(textList, val)
  loadSectionAudio(val, true)
}

// 上一章
function prewSection() {
  const index = get(activePage)
  if (index <= 0) return
  changeActionSection(get(index) - 1)
}

// 下一章
function nextSection() {
  const index = get(activePage)
  if (index >= get(BookRender.sectionNum) - 1) return
  changeActionSection(get(index) + 1)
}

onKeyStroke(['ArrowLeft'], prewSection)
onKeyStroke(['ArrowRight'], nextSection)
onKeyStroke(['ArrowUp'], prewSentence)
onKeyStroke(['ArrowDown'], nextSentence)

const zeroPoint = 10
TTSbus.on((val) => {
  if (val === 'next') {
    const total = get(textList).length
    const index = get(activeText)
    if (total <= zeroPoint || total - index <= zeroPoint) {
      // 到达临界点，通知加载下一章音频
      loadNextSection()
    }

    nextSentence()
  }
})

async function init() {
  setLoading(true)
  try {
    Howler.unload()
    // set(activePage, get(bookPageStore.page))
    const text = await handleText(get(activePage))
    set(textList, text) // 加载并切割文本内容
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
      <div class="flex-1  h-full overflow-hidden">
        <div class="flex flex-row h-full overflow-hidden">
          <div class="catalog-wrapper bg-base-100 overflow-auto hover:scrollbar-thin scrollbar-none" ref="catalogRef">
            <ExpandTreeView :data="toc" :active="activePage" @click="onCatalog" />
          </div>
          <div class="prose px-2 w-full max-w-full overflow-auto hover:scrollbar-thin scrollbar-none cursor-pointer"
            ref="contentRef">
            <p v-for="item, index in textList" class="px-2 rounded"
              :class="[index === activeText ? 'selection-info' : 'hover:bg-base-300/60']"
              @click="changeActiveSentence(index)">{{ item }}</p>
          </div>
        </div>
      </div>
      <div class="px-4 pt-8 flex flex-row justify-center items-center">
        <div class="flex flex-row items-center gap-4 h-16">

          <div class=" dropdown dropdown-top dropdown-hover">
            <div tabindex="0" role="button" class="btn">
              <VolumeX v-if="isMute" />
              <Volume1 v-else />
            </div>
            <div class="dropdown-content">
              <input type="range" min="0" max="100" v-model="volume" value="40"
                class="range range-xs range-info w-52" />
            </div>
          </div>
          <div class="tooltip" data-tip="上一章">
            <button class="btn btn-accent " @click="prewSection()">
              <StepBack />
            </button>
          </div>
          <div class="tooltip" data-tip="上一句">
            <button class="btn btn-primary " @click="prewSentence()">
              <Rewind />
            </button>
          </div>
          <div class="tooltip" :data-tip="isPlaying ? '暂停' : '播放'">
            <div class="avatar placeholder" @click="sound.toggle()">
              <div
                class="bg-neutral text-neutral-content ring-primary ring-offset-base-100 w-12 rounded-full ring ring-offset-2 ">
                <span class="loading loading-ring" v-if="isPlaying"></span>
                <Triangle :class="{ 'animate-spin': isPlaying }" v-else />
              </div>
            </div>
          </div>
          <div class="tooltip" data-tip="下一章">
            <button class="btn btn-primary " @click="nextSentence()">
              <FastForward />
            </button>
          </div>
          <div class="tooltip" data-tip="下一句">
            <button class="btn btn-accent " @click="nextSection()">
              <StepForward />
            </button>
          </div>
          <div class="join justify-center items-center ml-6">
            <button class="btn join-item " :style="textOpacity">声音模型</button>
            <Select :list="languageList" v-model="language" class-name="!w-40 join-item " />
            <Select :list="voices" v-model="voice" class-name="!min-w-44  join-item" />
          </div>
        </div>
      </div>
      <BookLanguage ref="bookLanguageRef" :id="bookInfo!.id" :close="closeBookLanguage" />
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