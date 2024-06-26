<script setup lang="ts">
import { formatDecimal, wait } from '@renderer/shared';
import { useBookPageStore } from '@renderer/store';
import { get, onKeyStroke, set, useDebounceFn, useScroll, useThrottleFn } from '@vueuse/core';
import { computed, nextTick, ref, watchEffect } from 'vue';
import { CONTINAER_ID } from '../highlight';
import { getBookHref, isExternal, openExternal } from '../render';
import { Position } from '../type';
import { findPositionDom, getSectionSize, getSourceTarget, toNextView, toPrewView } from '../util';
import SectionView from './Section.vue';

interface Props {
  section: any[],
  isScrollLocked: boolean,
}

const props = withDefaults(defineProps<Props>(), {
  section: () => [],
  isScrollLocked: false,
})


defineExpose({ jump })
const emit = defineEmits(['progress'])

const containerRef = ref<HTMLElement | null>(null) // 监听dom变化

const index = ref<number>(0)
const bookPageStore = useBookPageStore()
const section = computed(() => props.section[index.value].html)

const { y } = useScroll(containerRef)

// 计算进度
const calculateProgress = useDebounceFn((progress: number) => {
  emit('progress', progress)
}, 200)

watchEffect(async () => {
  let dom = get(containerRef)
  const page = get(index)
  bookPageStore.setPage(page)
  const top = get(y)
  await nextTick()
  dom = get(containerRef)
  if (dom) {
    const size = getSectionSize(page)
    if (size) {
      // 是否有滚动条
      const { offsetHeight, scrollHeight, firstElementChild } = dom
      if (firstElementChild!.clientHeight > offsetHeight) {
        const progress = formatDecimal((top + offsetHeight) / scrollHeight, 4)
        const res = formatDecimal(size.progress - size.current + progress * size.current, 4)
        calculateProgress(res)
      } else {
        emit('progress', size.progress)
      }
    }
  }
})



// 目录跳转
async function jump(i: number, id?: string, position?: Position) {
  if (containerRef.value && !id) {
    containerRef.value.scrollTop = 0
  }

  index.value = i

  if (id) {
    await wait(100)
    getSourceTarget(i, id)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  if (position) {
    await wait(100)
    const target = findPositionDom(i, position)
    if (!target) return
    const { top } = target.getBoundingClientRect()
    containerRef.value?.scrollTo({ top: top, behavior: 'smooth' })
  }
}


// 上一章
function prevSection() {
  if (index.value > 0) {
    index.value -= 1
  }
}

// 下一章
function nextSection() {
  // 滚动到顶部
  if (containerRef.value) {
    containerRef.value.scroll({
      top: 0,
      behavior: 'smooth'
    })
    containerRef.value.scrollTop = 0
  }
  if (index.value < props.section.length - 1) {
    index.value += 1
  }
}

// 点击书本链接
function linkClick(href: string) {
  if (isExternal(href)) {
    openExternal(href)
  } else {
    const value = getBookHref(href)
    if (value) {
      jump(value.index)
    }
  }
}

// 上一页
const jumpToPrewView = async () => {
  if (get(index) === 0) return

  set(index, get(index) - 1)

  await wait(100)

  containerRef.value!.scrollTo({ top: containerRef.value!.scrollHeight })
}

const getScrollData = () => {
  const dom = containerRef.value!
  const { height } = dom.getBoundingClientRect()
  const { scrollHeight, scrollTop } = dom
  return { height, scrollHeight, scrollTop, dom }
}
const prewView = useThrottleFn(async () => {
  if (props.isScrollLocked) return
  if (!get(containerRef)) return
  const { height, scrollHeight, scrollTop, dom } = getScrollData()

  if (scrollHeight <= height) {
    // 无滚动条
    await jumpToPrewView()
  } else {
    if (scrollTop === 0) {
      // 已经再顶部了
      await jumpToPrewView()
    } else {
      toPrewView(dom, scrollTop, height)
    }
  }
}, 300)
onKeyStroke(['ArrowLeft'], prewView)

// 下一页
const jumpToNextView = async () => {
  if (get(index) === props.section.length - 1) return

  set(index, get(index) + 1)
  await wait(100)

  containerRef.value!.scrollTo({ top: 0 })
}
const nextView = useThrottleFn(() => {
  if (props.isScrollLocked) return
  if (!get(containerRef)) return
  const { height, scrollHeight, scrollTop, dom } = getScrollData()
  if (scrollHeight <= height) {
    // 无滚动条
    jumpToNextView()
  } else {
    if (scrollTop + height >= scrollHeight) {
      // 已经在底部了
      jumpToNextView()
    } else {
      toNextView(dom, scrollTop, height, scrollHeight - height)
    }
  }
}, 300)
onKeyStroke(['ArrowRight'], nextView)

// 向上翻一点点
const littlePrevView = () => {
  if (props.isScrollLocked) return
  if (!get(containerRef)) return
  const { height, scrollHeight, scrollTop, dom } = getScrollData()
  if (scrollHeight > height) {
    if (scrollTop !== 0) {
      toPrewView(dom, scrollTop, 10)
    }
  }
}
onKeyStroke(['ArrowUp'], littlePrevView)

// 向下翻一点点
const littleNextView = () => {
  if (props.isScrollLocked) return
  if (!get(containerRef)) return
  const { height, scrollHeight, scrollTop, dom } = getScrollData()
  if (scrollHeight > height) {
    if (scrollTop + height < scrollHeight) {
      toNextView(dom, scrollTop, 10, scrollHeight - height)
    }
  }
}
onKeyStroke(['ArrowDown'], littleNextView)
</script>

<template>
  <!-- 书籍内容 -->
  <div class=" bg-base-100 h-full cursor-pointer  overflow-auto scrollbar-thin" ref="containerRef" :id="CONTINAER_ID">
    <div class="prose mx-auto my-0 prose-width" :data-page-number="index">
      <div class="py-8">
        <button class="btn btn-active btn-neutral" @click="prevSection">上一章</button>
      </div>
      <SectionView :key="index" :index="index" :data="section" @link-click="linkClick"></SectionView>
      <div class="text-center py-10">
        <button class="btn  btn-active  btn-primary btn-wide" @click="nextSection">下一章</button>
      </div>
    </div>
  </div>
</template>