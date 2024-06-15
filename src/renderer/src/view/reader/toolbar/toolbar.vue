<script setup lang="ts">
import { get, useElementSize } from '@vueuse/core';
import { useRouteParams } from '@vueuse/router';
import { Baseline, Copy, Highlighter, MessageSquareMore, SpellCheck2, Trash } from 'lucide-vue-next';
import { computed, ref } from 'vue';
import { highlighter } from '../highlight';
import { HighlightType, highlightColor } from '../highlight-color';
import { NoteBarStyle, NoteToolBarAction, ToolbarStyle } from './action';

const container = ref<HTMLElement | null>(null)
const { width, height } = useElementSize(container)

const style = computed(() => {
  const { top, left } = ToolbarStyle.style

  const _top = top - height.value - 10

  return { top: `${top === 0 ? -1000 : _top > 0 ? _top : 0}px`, left: `${left - width.value / 2}px` }
})

const isEdite = ToolbarStyle.isEdite;
const bookParam = useRouteParams<string>('id')

const noteToolBar = new NoteToolBarAction(ToolbarStyle.source, isEdite, bookParam)

const activeTextDecoration = noteToolBar.decoration

// 颜色
const activeColor = noteToolBar.color

// 打开笔记输入框
const openNoteRich = () => {
  if (!get(isEdite)) {
    // 没有高亮，直接笔记输入框
    const source = ToolbarStyle.source.map(item => {
      return { ...item, className: 'selection-info' }
    })
    highlighter?.fromSource(source)
    // highlighter?.cacheRange()
  }
  NoteBarStyle.open(ToolbarStyle.source!, get(isEdite))
  ToolbarStyle.close()
}

const list = [
  { name: '复制', icon: Copy, click: () => noteToolBar.copySource(), active: 'copy' },
  { name: '马克笔', icon: Highlighter, click: () => noteToolBar.marker(), active: HighlightType.marker },
  { name: '直线', icon: Baseline, click: () => noteToolBar.beeline(), active: HighlightType.beeline },
  { name: '波浪线', icon: SpellCheck2, click: () => noteToolBar.wavy(), active: HighlightType.wavy },
  { name: '写想法', icon: MessageSquareMore, click: openNoteRich, active: 'note' },
]
</script>

<template>
  <div class="fixed inset-0">
    <div ref="container"
      class="absolute bg-base-100 border border-info z-50 bar-shadow rounded-md flex flex-col divide-y ease-in-out  shadow-cyan-500/50"
      :style="style" @click.stop>
      <div class="flex flex-row gap-3 cursor-pointer p-2.5">
        <div v-for="item in highlightColor.getColors()" class="badge badge-lg" @click="noteToolBar.changeColor(item)"
          :class="highlightColor.getBadgeColor(item)" :key="item">
          {{ item === activeColor ? '✓' : '' }}
        </div>
      </div>
      <ul class="menu menu-horizontal p-1 m-0">
        <li @click.stop="item.click" v-for="item in list" :key="item.name" class="tooltip" :data-tip="item.name">
          <a :class="{ active: item.active === activeTextDecoration }">
            <component :is="item.icon" />
          </a>
        </li>
        <li @click.stop="noteToolBar.remove()" class="tooltip" data-tip="删除" v-if="isEdite">
          <a>
            <Trash />
          </a>
        </li>
      </ul>
    </div>
  </div>

</template>

<style scoped>
.bar-shadow {
  box-shadow: 0 10px 50px 0 rgba(0, 0, 0, .1);
}
</style>