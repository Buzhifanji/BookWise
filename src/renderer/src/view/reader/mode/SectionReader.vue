<script setup lang="ts">
import { wait } from '@renderer/shared';
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

function prev() {
  if (index.value > 0) {
    index.value -= 1
  }
}

function next() {
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


</script>

<template>
  <!-- 书籍内容 -->
  <div class=" bg-base-100 h-full cursor-pointer  overflow-auto scrollbar-thin" ref="containerRef" :id="CONTINAER_ID">
    <div class="prose mx-auto my-0 prose-width" :data-page-number="index">
      <div class="py-8">
        <button class="btn btn-active btn-neutral" @click="prev">上一章</button>
      </div>
      <SectionView :key="index" :index="index" :data="section" @link-click="linkClick"></SectionView>
      <div class="text-center py-10">
        <button class="btn  btn-active  btn-primary btn-wide" @click="next">下一章</button>
      </div>
    </div>
  </div>
</template>