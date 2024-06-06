<script setup lang="ts">
import RingLoadingView from '@renderer/components/loading/RingLoading.vue';
import { Toast } from '@renderer/components/toast';
import { wait } from '@renderer/shared';
import { useDebounceFn, useResizeObserver, useThrottleFn, useToggle } from '@vueuse/core';
import { nextTick, onMounted, ref } from 'vue';
import { getBookHref, isExternal, openExternal } from '../render';
import SectionView from './Section.vue';

interface Props {
  section: any[]
}

const props = withDefaults(defineProps<Props>(), {
  section: () => []
})


defineExpose({ jump })

let currentIndex = 0;

const [isLoading, setLoading] = useToggle(false)

const containerRef = ref<HTMLElement | null>(null) // 监听dom变化
const remendyRef = ref<HTMLElement | null>(null) // 监听dom变化

const debouncedFn = useDebounceFn(async () => {
  setHeight()
  await nextTick()
  resetScrollLeft()
}, 400)

useResizeObserver(containerRef, debouncedFn)

const index = ref<number>(0)

const section = ref<string>(props.section[0] || '')

// 更新章节内容
async function updateSection() {
  setLoading(true)
  currentIndex = 0
  section.value = props.section[index.value] || ''
  await wait(200)
  setLoading(false)
}


function setHeight() {
  const dom = containerRef.value
  if (dom) {
    let result = 0;
    const { scrollWidth, offsetWidth } = dom
    if (scrollWidth > offsetWidth) {
      const remainder = scrollWidth % offsetWidth
      console.log(scrollWidth, offsetWidth, remainder)
      result = offsetWidth - remainder
    }
    remendyRef.value!.style.height = `${result}px`
  }
}

onMounted(() => {
  setHeight()
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
async function jump(i: number) {
  index.value = i
  await updateSection()
}

async function prev() {
  if (index.value > 0) {
    index.value -= 1
    await updateSection()
    await nextTick()
    setHeight()
    // 需要等待 弥补的空div渲染完成
    await wait(10)
    const dom = containerRef.value!
    dom.scrollTo({ left: dom.scrollWidth })
  } else {
    Toast({ position: ['toast-top', 'toast-center'], type: 'alert-warning', message: '已经是第一页了', })
  }
}

async function next() {
  if (index.value < props.section.length - 1) {
    index.value += 1
    await updateSection()
    await nextTick()

  } else {
    Toast({ position: ['toast-top', 'toast-center'], type: 'alert-warning', message: '已经是最后一页了', })
  }
  setHeight()
}

const prewView = useThrottleFn(() => {
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
}, 300)


const nextView = useThrottleFn(() => {
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
}, 300)


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


</script>

<template>
  <!-- 书籍内容 -->
  <div class="bg-base-300 h-full cursor-pointer p-10 overflow-hidden">
    <div class="prose max-w-screen-2xl mx-auto my-0 bg-base-100 rounded-3xl h-full relative">
      <div class="absolute inset-0">
        <RingLoadingView v-if="isLoading" class="rounded-3xl" />
        <template v-else>
          <div ref="containerRef"
          :data-page-number="index"
            class="columns-1 lg:columns-2 gap-x-16 h-full overflow-auto scrollbar-none p-8 pb-12 double-container relative">
            <SectionView :key="index" :index="index" :data="section"  @link-click="linkClick">
            </SectionView>
            <div ref="remendyRef"></div>
          </div>
          <button class="btn btn-outline absolute bottom-5 left-10 btn-sm" @click="prewView">上一页</button>
          <button class="btn btn-outline absolute bottom-5 right-10 btn-sm" @click="nextView">下一页</button>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.double-container {
  column-fill: auto;
}
</style>