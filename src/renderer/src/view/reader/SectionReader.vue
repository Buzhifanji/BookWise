<script setup lang="ts">
import { computed, ref } from 'vue';
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

const containerRef = ref<HTMLElement | null>(null) // 监听dom变化

const index = ref<number>(0)

const section = computed(() => props.section[index.value])

// 目录跳转
function jump(i: number) {
  index.value = i
  // rowVirtualizer.value.scrollToIndex(index, { align: 'start', behavior: 'smooth' })
}

// 点击书本链接
function linkClick(href: string) {
  bookLinkClick(href, jump)
}


</script>

<template>
  <!-- 书籍内容 -->
  <div class="flex-1 bg-base-100 h-full cursor-pointer  overflow-auto hover:scrollbar-thin scrollbar-none"
    ref="containerRef">
    <SectionView :data="section" @link-click="linkClick"></SectionView>
  </div>
</template>