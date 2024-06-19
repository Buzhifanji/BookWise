<script setup lang="ts">
import { wait } from '@renderer/shared';
import { get, onKeyStroke, set, useThrottleFn } from '@vueuse/core';
import { computed, ref } from 'vue';
import { CONTINAER_ID } from '../highlight';
import { getBookHref, isExternal, openExternal } from '../render';
import { getSourceTarget } from '../source';
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

const section = computed(() => props.section[index.value])

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
const prewView = useThrottleFn(async () => {
  const dom = containerRef.value
  if (!dom) return
  const { height } = dom.getBoundingClientRect()
  const { scrollHeight, scrollTop } = dom

  if (scrollHeight <= height) {
    // 无滚动条
    await jumpToPrewView()
  } else {
    if (scrollTop === 0) {
      // 已经再顶部了
      await jumpToPrewView()
    } else {
      let val = scrollTop - height
      if (val < 0) val = 0

      dom.scrollTo({ top: val, behavior: 'smooth' })
    }
  }
}, 300)

// 下一页
const jumpToNextView = async () => {
  if (get(index) === props.section.length - 1) return

  set(index, get(index) + 1)
  await wait(100)

  containerRef.value!.scrollTo({ top: 0 })
}
const nextView = useThrottleFn(() => {
  const dom = containerRef.value
  if (!dom) return
  const { height } = dom.getBoundingClientRect()
  const { scrollHeight, scrollTop } = dom
  if (scrollHeight <= height) {
    // 无滚动条
    jumpToNextView()
  } else {
    if (scrollTop + height >= scrollHeight) {
      // 已经在底部了
      jumpToNextView()
    } else {
      const total = scrollHeight - height
      let val = scrollTop + height
      if (val > total) val = total

      dom.scrollTo({ top: val, behavior: 'smooth' })
    }
  }

}, 300)

onKeyStroke(['ArrowDown', 'ArrowRight'], nextView)
onKeyStroke(['ArrowUp', 'ArrowLeft'], prewView)
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