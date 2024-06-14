<script setup lang="ts">
import { NoteAction, Toast } from '@renderer/components';
import { get, set, useClipboard, useElementSize } from '@vueuse/core';
import { Baseline, Copy, Highlighter, MessageSquareMore, SpellCheck2, Trash } from 'lucide-vue-next';
import { computed, ref } from 'vue';
import { highlighter } from '../highlight';
import { ColorKeys, HighlightType, highlightColor } from '../highlight-color';
import { NoteBarAction, ToolbarAction } from './action';

const container = ref<HTMLElement | null>(null)
const { width, height } = useElementSize(container)

const style = computed(() => {
  const { top, left } = ToolbarAction.style

  const _top = top - height.value - 10

  return { top: `${top === 0 ? -1000 : _top > 0 ? _top : 0}px`, left: `${left - width.value / 2}px` }
})


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
const activeColor = ref<ColorKeys>(highlightColor.color)
const changeColor = (value: ColorKeys) => {
  if (!ToolbarAction.source.length) return
  const { className } = ToolbarAction.source[0]
  if (className.includes(value)) return

  set(activeColor, value)
  highlightColor.changeColor(value)
  updateNote()
}

// 高亮 波浪线 直线
const activeTextDecoration = ref('')
const changeTextDecoration = (val: HighlightType) => {
  if (get(activeTextDecoration) === val) return
  highlightColor.changeType(val)
  set(activeTextDecoration, val)
  updateNote()
}
const onMarker = () => changeTextDecoration(HighlightType.marker)
const onBeeline = () => changeTextDecoration(HighlightType.beeline)
const onWave = () => changeTextDecoration(HighlightType.wavy)

// 更新笔记
function updateNote() {
  if (!ToolbarAction.source.length) return
  const { id, className } = ToolbarAction.source[0]
  const newClassName = `${get(activeTextDecoration)}-${get(activeColor)}`
  ToolbarAction.source.forEach(item => item.className = newClassName)

  // 更新dom节点
  highlighter.replaceClass(id, newClassName, className)
  // 更新数据库的数据
  NoteAction.updateBySourceId(id, { domSource: JSON.stringify(ToolbarAction.source) })
}

// 删除笔记
function removeNote() {
  if (!ToolbarAction.source.length) return
  const { id } = ToolbarAction.source[0]
  highlighter.remove(id)
  NoteAction.removeBySoureIds([id])
  ToolbarAction.close()
}

function init() {
  const source = ToolbarAction.source![0]
  if (!source) return
  const { className } = source
  const [_textType, color] = className.split('-')

  // 文字标记类型
  let textType = ''
  if (_textType === HighlightType.marker) {
    textType = HighlightType.marker
  } else if (_textType === HighlightType.beeline) {
    textType = HighlightType.beeline
  } else if (_textType === HighlightType.wavy) {
    textType = HighlightType.wavy
  }
  set(activeTextDecoration, textType)

  // 颜色
  if (color) {
    set(activeColor, color)
  }
}

init()

const list = [
  { name: '复制', icon: Copy, click: copyAction, active: 'copy' },
  { name: '马克笔', icon: Highlighter, click: onMarker, active: HighlightType.marker },
  { name: '直线', icon: Baseline, click: onBeeline, active: HighlightType.beeline },
  { name: '波浪线', icon: SpellCheck2, click: onWave, active: HighlightType.wavy },
  { name: '写想法', icon: MessageSquareMore, click: openNoteRich, active: 'note' },
]
</script>

<template>
  <div class="fixed inset-0">
    <div ref="container"
      class="absolute bg-base-100 border border-info z-50 shadow-2xl rounded-md flex flex-col divide-y ease-in-out  shadow-cyan-500/50"
      :style="style" @click.stop>
      <div class="flex flex-row gap-3 cursor-pointer p-2.5">
        <div v-for="item in highlightColor.getColors()" class="badge badge-lg" @click="changeColor(item)"
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
        <li @click.stop="removeNote" class="tooltip" data-tip="删除">
          <a>
            <Trash />
          </a>
        </li>
      </ul>
    </div>
  </div>

</template>