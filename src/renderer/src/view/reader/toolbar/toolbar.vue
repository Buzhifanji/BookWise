<script setup lang="ts">
import { Toast } from '@renderer/components';
import { useClipboard, useElementSize } from '@vueuse/core';
import { Baseline, Copy, Highlighter, MessageSquareMore, SpellCheck2, Trash } from 'lucide-vue-next';
import { computed, ref } from 'vue';
import { NoteBarAction, ToolbarAction } from './action';

const container = ref<HTMLElement | null>(null)
const { width, height } = useElementSize(container)

const style = computed(() => {
  const { top, left } = ToolbarAction.style

  const _top = top - height.value - 10

  return { top: `${top === 0 ? -1000 : _top > 0 ? _top : 0}px`, left: `${left - width.value / 2}px` }
})

const isShowToolBar = ToolbarAction.show

// 打开笔记输入框
const openNoteRich = () => {
  NoteBarAction.open(ToolbarAction.source!)
  ToolbarAction.close()
}

// 复制
const { copy } = useClipboard()
const copyAction = () => {
  const val = ToolbarAction.source.reduce((acc, cur) => (acc += cur.text), '')
  copy(val)
  Toast({
    message: '已复制到剪贴板',
    position: ['toast-top', 'toast-center'],
    type: 'alert-success',
  })
}

const list = [
  { name: '复制', icon: Copy, click: copyAction },
  { name: '马克笔', icon: Highlighter, click: () => { } },
  { name: '直线', icon: Baseline, click: () => { } },
  { name: '波浪线', icon: SpellCheck2, click: () => { } },
  { name: '写想法', icon: MessageSquareMore, click: openNoteRich },
]
</script>

<template>
  <div class="fixed inset-0" v-if="isShowToolBar">
    <div ref="container"
      class="absolute bg-base-100 border border-info z-50 shadow-2xl rounded-md  ease-in-out  shadow-cyan-500/50"
      :style="style" v-show="ToolbarAction.show">
      <ul class="menu menu-horizontal p-0 m-0">
        <li @click.stop="item.click" v-for="item in list" :key="item.name" class="tooltip" :data-tip="item.name">
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
      <div></div>
    </div>
  </div>

</template>