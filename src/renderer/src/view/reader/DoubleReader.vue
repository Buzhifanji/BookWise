<script setup lang="ts">
import { Toast } from '@renderer/components/toast';
import { useResizeObserver } from '@vueuse/core';
import { computed, nextTick, onMounted, ref } from 'vue';
import '../../assets/reader.css';
import SectionView from './Section.vue';
import { bookLinkClick } from './render';

interface Props {
  section: any[]
}

const props = withDefaults(defineProps<Props>(), {
  section: () => []
})


defineExpose({ jump })

let currentIndex = 0;

const containerRef = ref<HTMLElement | null>(null) // 监听dom变化

const height = ref<number>(0)

useResizeObserver(containerRef, () => {
  getHeight()
})

const index = ref<number>(0)

const section = computed(() => props.section[index.value])

async function getHeight() {
  const dom = containerRef.value
  let result = 0;
  if (dom) {
    const { scrollWidth, offsetWidth } = dom
    if (scrollWidth > offsetWidth) {
      const remainder = scrollWidth / offsetWidth
      result = offsetWidth - remainder
    }
  }
  height.value = result

  await nextTick()

  resetScrollLeft()
}

onMounted(() => {
  getHeight()
})

/**
 * 当窗口变化的时候，需要重置滚动条的位置
 */
function resetScrollLeft() {
  if (currentIndex > 0) {
    const dom = containerRef.value
    if (!dom) return

    const { scrollWidth, offsetWidth, scrollLeft } = dom
    if (scrollLeft === 0) return

    if (scrollWidth <= offsetWidth) {
      dom.scrollLeft = 0
    } else {
      dom.scrollLeft = currentIndex * offsetWidth
    }
  }
}


// 目录跳转
function jump(i: number) {
  index.value = i
}

async function prev() {
  if (index.value > 0) {
    index.value -= 1
    await nextTick()
    currentIndex = 0
    containerRef.value!.scrollLeft = containerRef.value!.scrollWidth
  } else {
    Toast({ position: ['toast-top', 'toast-center'], type: 'alert-warning', message: '已经是第一页了', })
  }
}

function prewView() {
  const dom = containerRef.value
  if (dom) {
    const { scrollWidth, offsetWidth, scrollLeft } = dom

    if (scrollWidth <= offsetWidth) {
      // 只有一页的情况
      prev()
    } else if (scrollLeft + offsetWidth >= scrollWidth) {
      // 已经滚动到最右端了
      currentIndex -= 1
      dom.scrollLeft -= offsetWidth
    } else if (scrollLeft === 0) {
      // 已经滚动到最左端
      prev()
    } else {
      currentIndex -= 1
      dom.scrollLeft -= offsetWidth
    }
  } else {
    console.warn('dom is null')
    prev()
  }
}

function next() {
  if (index.value < props.section.length - 1) {
    index.value += 1
    currentIndex = 0
    containerRef.value!.scrollLeft = 0
  } else {
    Toast({ position: ['toast-top', 'toast-center'], type: 'alert-warning', message: '已经是最后一页了', })
  }
}

function nextView() {
  const dom = containerRef.value
  if (dom) {
    const { scrollWidth, offsetWidth, scrollLeft } = dom
    if (scrollWidth <= offsetWidth) {
      // 只有一页的情况
      next()
    } else if (scrollLeft + offsetWidth >= scrollWidth) {
      // 已经滚动到最右端了
      next()
    } else {
      currentIndex += 1
      dom.scrollLeft += offsetWidth
    }
  } else {
    console.warn('dom is null')
    next()
  }
}

// 点击书本链接
function linkClick(href: string) {
  bookLinkClick(href, jump)
}


</script>

<template>
  <!-- 书籍内容 -->
  <div class="flex-1 bg-base-300 h-full cursor-pointer p-10 overflow-hidden">
    <div class="prose max-w-screen-2xl mx-auto my-0 bg-base-100 rounded-3xl h-full relative">
      <!-- <div class="absolute inset-0"> -->
      <div ref="containerRef"
        class="columns-1 lg:columns-2 gap-x-16 h-full overflow-auto  p-8 pb-12 double-container relative">
        <SectionView :key="index" :data="section" :data-index="index" @link-click="linkClick"></SectionView>
        <div :style="{ height: `${height}px` }"></div>
      </div>
      <button class="btn btn-outline absolute bottom-5 left-10 btn-sm" @click="prewView">上一页</button>
      <button class="btn btn-outline absolute bottom-5 right-10 btn-sm" @click="nextView">下一页</button>
    </div>
  </div>
</template>

<style scoped>
.double-container {
  column-fill: auto;
}
</style>