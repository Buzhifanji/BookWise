<script setup lang="ts">
import { Toast } from '@renderer/components';
import { get, set, useClipboard, useElementSize } from '@vueuse/core';
import { Baseline, Copy, Highlighter, MessageSquareMore, SpellCheck2, Trash } from 'lucide-vue-next';
import { computed, ref } from 'vue';
import { ColorKeys, HighlightType, highlightColor } from '../highlight-color';
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

// 颜色
const activeColor = ref(0)
const changeColor = (value: ColorKeys, i: number) => {
  const { className } = ToolbarAction.source![0]
  if (className.includes(value)) return

  set(activeColor, i)
  highlightColor.changeSelectColor(value)

}

// 高亮 波浪线 直线
const setTextDecoration = () => {
  const source = ToolbarAction.source![0]
  if (!source) return ''
  const { className } = source
  let result = ''
  if (className.includes(HighlightType.marker)) {
    result = HighlightType.marker
  } else if (className.includes(HighlightType.beeline)) {
    result = HighlightType.beeline
  } else if (className.includes(HighlightType.wave)) {
    result = HighlightType.wave
  }
  return result
}
const activeTextDecoration = ref(setTextDecoration())
const onMarker = () => {
  if (get(activeTextDecoration) === HighlightType.marker) return


}

const list = [
  { name: '复制', icon: Copy, click: copyAction, active: 'copy' },
  { name: '马克笔', icon: Highlighter, click: onMarker, active: HighlightType.marker },
  { name: '直线', icon: Baseline, click: () => { }, active: HighlightType.beeline },
  { name: '波浪线', icon: SpellCheck2, click: () => { }, active: HighlightType.wave },
  { name: '写想法', icon: MessageSquareMore, click: openNoteRich, active: 'note' },
]
</script>

<template>
  <div class="fixed inset-0" v-if="isShowToolBar">
    <div ref="container"
      class="absolute bg-base-100 border border-info z-50 shadow-2xl rounded-md flex flex-col divide-y ease-in-out  shadow-cyan-500/50"
      :style="style" @click.stop>
      <div class="flex flex-row gap-3 cursor-pointer p-2.5">
        <div v-for="item, index in highlightColor.getColors()" class="badge badge-lg" @click="changeColor(item, index)"
          :class="highlightColor.getBadgeColor(item)" :key="item">
          {{ index === activeColor ? '✓' : '' }}
        </div>
      </div>
      <ul class="menu menu-horizontal p-1 m-0">
        <li @click.stop="item.click" v-for="item in list" :key="item.name" class="tooltip" :data-tip="item.name">
          <a :class="{ active: item.active === activeTextDecoration }">
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
  </div>

</template>