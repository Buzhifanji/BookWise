<script setup lang="ts">
import { wait } from '@renderer/shared';
import { get, onKeyStroke, set, useThrottleFn } from '@vueuse/core';
import { computed, ref } from 'vue';
import { CONTINAER_ID } from '../highlight';
import { getBookHref, isExternal, openExternal } from '../render';
import { getSourceTarget, toNextView, toPrewView } from '../util';
import SectionView from './Section.vue';

interface Props {
  section: any[]
}

const props = withDefaults(defineProps<Props>(), {
  section: () => []
})


defineExpose({ jump })

const containerRef = ref<HTMLElement | null>(null) // 监听dom变化

const index = ref<number>(0)

const section = computed(() => props.section[index.value].html)

// 目录跳转
async function jump(i: number, id?: string) {
  if (containerRef.value && !id) {
    containerRef.value.scrollTop = 0
  }

  index.value = i

  if (!id) return
  await wait(100)

  const target = getSourceTarget(i, id)
  if (!target) return

  target.scrollIntoView({
    behavior: 'smooth',
    block: 'center'
  })
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