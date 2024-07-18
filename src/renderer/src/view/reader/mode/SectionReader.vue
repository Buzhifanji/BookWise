<script setup lang="ts">
import { BookRender } from '@renderer/hooks';
import { formatDecimal, wait } from '@renderer/shared';
import { useBookPageStore } from '@renderer/store';
import { get, onKeyStroke, set, useDebounceFn, useScroll, useThrottleFn, useToggle } from '@vueuse/core';
import { ref } from 'vue';
import { CONTINAER_ID } from '../highlight';
import { Position } from '../type';
import { findPositionDom, getSectionSize, getSourceTarget, toNextView, toPrewView } from '../util';
import SectionView from './Section.vue';

interface Props {
  isScrollLocked: boolean,
  sections: number
}

const props = withDefaults(defineProps<Props>(), {
  isScrollLocked: false,
  sections: 0
})


defineExpose({ catalogJump, noteJump, positionJump })
const emit = defineEmits(['progress'])

let position: Position | undefined = undefined;
let highlightId: string | undefined = undefined;
let href: string | undefined = undefined

console.log(BookRender.isInOneCatalog)

const [isLoad, setLoad] = useToggle(false)

const containerRef = ref<HTMLElement | null>(null) // 监听dom变化

const currentPage = ref<number>(0)
const bookPageStore = useBookPageStore()

const { y } = useScroll(containerRef)

// 计算进度
const calculateProgress = useDebounceFn((progress: number) => {
  emit('progress', progress)
}, 200)

// watchEffect(async () => {
//   let dom = get(containerRef)
//   const page = get(currentPage)

//   if (BookRender.isInOneCatalog) {
//     bookPageStore.setPage(href || '')
//   } else {
//     bookPageStore.setPage(page)
//   }
//   const top = get(y)
//   await nextTick()
//   dom = get(containerRef)
//   if (dom) {
//     const size = getSectionSize(page)
//     if (size) {
//       // 是否有滚动条
//       const { offsetHeight, scrollHeight, firstElementChild } = dom
//       if (firstElementChild!.clientHeight > offsetHeight) {
//         const progress = formatDecimal((top + offsetHeight) / scrollHeight, 4)
//         const res = formatDecimal(size.progress - size.current + progress * size.current, 4)
//         calculateProgress(res)
//       } else {
//         emit('progress', size.progress)
//       }
//     }
//   }
// })

function changePage(page: number) {
  setLoad(false)
  set(currentPage, page)
}

function onProgress() {
  const dom = get(containerRef)
  if (!dom) return

  const size = getSectionSize(get(currentPage))
  if (!size) return
  const top = get(y)
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

function sectionLoaded(i: number) {
  if (i === get(currentPage)) {
    setLoad(true)
    positionToView()
  }
}

function positionToView() {
  if (position) {
    const target = findPositionDom(get(currentPage), position)
    if (!target) return
    const { top } = target.getBoundingClientRect()
    containerRef.value?.scrollTo({ top: top, behavior: 'smooth' })
    position = undefined
  }
}

function clearScroll() {
  if (containerRef.value) {
    containerRef.value.scrollTop = 0
  }
}

function noteLoaded(i: number) {
  if (get(currentPage) !== i) return

  // 高亮跳转
  if (highlightId) {
    const target = getSourceTarget(i, highlightId)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }
}

function catalogJump(page: number, _href?: string) {
  if (page !== get(currentPage)) {
    clearScroll()
    changePage(page)
  }
  // currentPage.value = page
  // href = _href
}

function noteJump(page: number, id: string) {
  currentPage.value = page
  const target = getSourceTarget(page, id)
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'center' })
  } else {
    highlightId = id
  }
}

function positionJump(_position: Position) {
  if (!_position) return

  clearScroll()
  position = _position
  currentPage.value = _position.page
}


// 上一章
function prevSection() {
  if (currentPage.value > 0) {
    currentPage.value -= 1
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
  if (currentPage.value < props.sections - 1) {
    currentPage.value += 1
  }
}

// 点击书本链接
function linkClick(href: string) {
  if (BookRender.isExternal(href)) {
    BookRender.openExternal(href)
  } else {
    const value = BookRender.getBookHref(href)
    if (value) {
      catalogJump(value.currentPage)
    }
  }
}

// 上一页
const jumpToPrewView = async () => {
  if (get(currentPage) === 0) return

  set(currentPage, get(currentPage) - 1)

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
  if (get(currentPage) === props.sections - 1) return

  set(currentPage, get(currentPage) + 1)
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
    <div class="prose mx-auto my-0 prose-width" :data-page-number="currentPage">
      <div class="py-8">
        <button class="btn btn-active btn-neutral" @click="prevSection">上一章</button>
      </div>
      <SectionView :key="currentPage" :index="currentPage" :loaded="sectionLoaded" :noteLoaded="noteLoaded"
        @link-click="linkClick">
      </SectionView>
      <div class="text-center py-10">
        <button class="btn  btn-active  btn-primary btn-wide" @click="nextSection">下一章</button>
      </div>
    </div>
  </div>
</template>