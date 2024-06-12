<script setup lang="ts">
import { useElementSize } from '@vueuse/core';
import { Baseline, Copy, Highlighter, MessageSquareMore, SpellCheck2, Trash } from 'lucide-vue-next';
import { computed, ref } from 'vue';
import { ToolbarAction } from './action';

const container = ref<HTMLElement | null>(null)
const { width, height } = useElementSize(container)

const style = computed(() => {
  const { top, left } = ToolbarAction.style

  return { top: `${top === 0 ? -1000 : top - height.value - 10}px`, left: `${left - width.value / 2}px` }
})

const list = [
  { name: '复制', icon: Copy },
  { name: '马克笔', icon: Highlighter },
  { name: '直线', icon: Baseline },
  { name: '波浪线', icon: SpellCheck2 },
  { name: '写想法', icon: MessageSquareMore },
]
</script>

<template>
  <div ref="container"
    class="absolute bg-base-100 border border-info z-50 shadow-2xl rounded-md  ease-in-out  shadow-cyan-500/50"
    :style="style" v-show="ToolbarAction.show">
    <ul class="menu menu-horizontal p-0 m-0">
      <li @click.stop v-for="item in list" :key="item.name" class="tooltip" :data-tip="item.name">
        <a>
          <component :is="item.icon" />
        </a>
      </li>
      <li @click.stop class="tooltip" data-tip="删除">
        <a>
          <Trash />
        </a>
      </li>
    </ul>
  </div>
</template>