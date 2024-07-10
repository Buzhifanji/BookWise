<script setup lang="ts">
import { RingLoadingView } from '@renderer/components';
import { t } from '@renderer/data';
import { $, formatDecimal, toastWarning, wait } from '@renderer/shared';
import { useBookPageStore } from '@renderer/store';
import { get, onKeyStroke, set, useDebounceFn, useResizeObserver, useScroll, useThrottleFn, useToggle } from '@vueuse/core';
import { nextTick, onMounted, ref, watchEffect } from 'vue';
import { CONTINAER_ID } from '../highlight';
import { getBookHref, isExternal, openExternal } from '../render';
import { Position } from '../type';
import { findPositionDom, getSectionSize } from '../util';
import SectionView from './Section.vue';

interface Props {
  section: any[],
  isScrollLocked: boolean,
}

const props = withDefaults(defineProps<Props>(), {
  section: () => [],
  isScrollLocked: false,
})
const emit = defineEmits(['progress'])

defineExpose({ jump })

let currentIndex = 0;

const [isLoading, setLoading] = useToggle(false)
const bookPageStore = useBookPageStore()
const containerRef = ref<HTMLElement | null>(null) // 监听dom变化
const remendyRef = ref<HTMLElement | null>(null) // 监听dom变化

const resize = useThrottleFn(async () => {
  setHeight()
  await nextTick()
  resetScrollLeft()
}, 400)

useResizeObserver(containerRef, resize)

const index = ref<number>(0)

// 进度
const { x } = useScroll(containerRef)
const calculateProgress = useDebounceFn((progress: number) => {
  emit('progress', progress)
}, 200)
watchEffect(async () => {
  let dom = get(containerRef)
  const page = get(index)
  bookPageStore.setPage(page)
  const left = get(x)
  await nextTick()
  dom = get(containerRef)
  if (dom) {
    const size = getSectionSize(page)
    if (size) {
      // 是否有滚动条
      const { offsetWidth, scrollWidth, firstElementChild } = dom
      if (firstElementChild!.clientHeight > offsetWidth) {
        const progress = formatDecimal((left + offsetWidth) / scrollWidth, 4)
        const res = formatDecimal(size.progress - size.current + Math.min(progress, 1) * size.current, 4)
        calculateProgress(res)
      } else {
        emit('progress', size.progress)
      }
    }
  }
})


// 更新章节内容
async function updateSection() {
  setLoading(true)
  currentIndex = 0
  await wait(200)
  setLoading(false)
}

const style = ref({ height: '0px' })

function setHeight() {
  const dom = containerRef.value
  if (dom) {
    let result = 0;
    const { scrollWidth, offsetWidth } = dom
    if (scrollWidth > offsetWidth) {
      const remainder = scrollWidth % offsetWidth
      if (remainder > 0) {
        result = offsetWidth - remainder
      }
    }
    set(style, { height: `${result}px` })
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

function domToView(target: HTMLElement) {
  const dom = containerRef.value!
  const { left } = target.getBoundingClientRect()
  const container = $(`#${CONTINAER_ID}`) as HTMLElement
  const content = container.querySelector('.prose') as HTMLElement
  const { left: cLeft } = content.getBoundingClientRect()
  const { offsetWidth } = dom

  const l = left - cLeft
  const remainder = +(l / offsetWidth).toFixed(0)
  if (dom.scrollLeft !== remainder * offsetWidth) {
    containerRef.value!.scrollLeft = remainder * offsetWidth
  }
}


// 目录跳转
async function jump(i: number, id?: string, position?: Position) {
  index.value = i
  await updateSection()

  if (id) {
    await nextTick()
    const dom = containerRef.value!
    const target = dom?.querySelector(`span[data-web-highlight_id='${id}']`) as HTMLElement
    if (target) {
      domToView(target)
    }
  }

  if (position) {
    await nextTick()
    const target = findPositionDom(i, position)
    if (target) {
      domToView(target)
    }
  }

}


async function prev() {
  if (index.value > 0) {
    index.value -= 1
    await updateSection()
    // 需要等待 弥补的空div渲染完成
    await wait(20)
    const dom = containerRef.value!

    dom.scrollTo({ left: dom.scrollWidth })
  } else {
    toastWarning(t('common.getFirstView'))
  }
}

async function next() {
  if (index.value < props.section.length - 1) {
    index.value += 1
    await updateSection()

  } else {
    toastWarning(t('common.getLastView'))
  }
}

const prewView = useThrottleFn(() => {
  if (props.isScrollLocked) return

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
  if (props.isScrollLocked) return

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

onKeyStroke(['ArrowDown', 'ArrowRight'], nextView)
onKeyStroke(['ArrowUp', 'ArrowLeft'], prewView)


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
    <div class="prose prose-width  mx-auto my-0 bg-base-100 rounded-3xl h-full relative">
      <div class="absolute inset-0">
        <RingLoadingView v-if="isLoading" class="rounded-3xl" />
        <template v-else>
          <div ref="containerRef" :data-page-number="index"
            class="columns-1 scroll-smooth transition ease-in-out lg:columns-2 gap-x-16 h-full overflow-auto scrollbar-none p-8 pb-12 double-container relative">
            <SectionView :key="index" :index="index" :data="section[index]" @link-click="linkClick">
            </SectionView>
            <div ref="remendyRef" :style="style"></div>
          </div>
          <button class="btn btn-outline absolute bottom-5 left-10 btn-sm" @click="prewView">{{ $t('common.prewView')
            }}</button>
          <button class="btn btn-outline absolute bottom-5 right-10 btn-sm" @click="nextView">{{ $t('common.nextView')
            }}</button>
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