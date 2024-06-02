<script setup lang="ts">
import { computed, ref } from 'vue';
import '../../../assets/reader.css';
import { getBookHref, isExternal, openExternal } from '../render';
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
function jump(i: number) {
  index.value = i
}

function prev() {
  if (index.value > 0) {
    index.value -= 1
  }
}

function next() {
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
  <div class="flex-1 bg-base-100 h-full cursor-pointer  overflow-auto hover:scrollbar-thin scrollbar-none"
    ref="containerRef">
    <div class="prose mx-auto my-0 ">
      <div class="py-8">
        <button class="btn btn-active btn-neutral" @click="prev">上一章</button>
      </div>
      <SectionView :key="index" :data="section" @link-click="linkClick"></SectionView>
      <div class="text-center py-10">
        <button class="btn  btn-active  btn-primary btn-wide" @click="next">下一章</button>
      </div>
    </div>
  </div>
</template>