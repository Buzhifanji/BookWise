<script setup lang="ts">
import { Book, Note, Tag } from '@renderer/batabase';
import { NoteAction, NoteText, SkeletonView, TagAction, TagInputView } from '@renderer/components';
import { t } from '@renderer/data';
import { toastError, toastWarning } from '@renderer/shared';
import { get, onClickOutside, onKeyStroke, set, useElementBounding, useParentElement, useToggle } from '@vueuse/core';
import { useRouteParams } from '@vueuse/router';
import { computed, onMounted, ref } from 'vue';
import { highlighter } from '../highlight';
import NoteListView from './NoteList.vue';
import SourceListView from './SourceList.vue';
import { NoteBarStyle, NoteRichAction } from './action';


const props = defineProps<{
  book: Book
}>()

const parentEl = useParentElement()
const cardRef = ref<HTMLElement | null>(null)
const textareatRef = ref<HTMLTextAreaElement | null>(null)
const textareaValue = ref('')

onClickOutside(cardRef, () => {
  closeNoteRich()
})

onKeyStroke('Escape', () => {
  closeNoteRich()
})

const [loading, setLoading] = useToggle(false)
const [submitLoading, setSubmitLoading] = useToggle(false)
const { width, left, } = useElementBounding(parentEl)
const bookParam = useRouteParams<string>('id')

const noteRichAction = new NoteRichAction(bookParam, textareaValue)

const style = computed(() => {
  const w = width.value
  const l = left.value
  const isLG = w > 180
  const padding = 80

  const _width = isLG ? w - padding * 2 : w
  const _left = isLG ? l + padding : l
  return { width: `${_width}px`, left: `${_left}px` }
})

const source = NoteBarStyle.source

const noteList = noteRichAction.notes

const tags = ref<Tag[]>([]) // 标签
let note: Note | undefined = undefined;

function closeNoteRich() {
  // 处理直接新增笔记的特殊情况
  if (!NoteBarStyle.isPainted) {
    if (get(source).length) {
      highlighter.remove(get(source)[0].id)
    }
  }
  NoteBarStyle.close()
}

async function init() {
  try {
    setLoading(true)
    // 手动绘制，直接添加笔记
    if (!NoteBarStyle.isPainted) {
      return
    }

    const domSource = get(source)
    if (domSource.length === 0) return

    note = await NoteAction.findBySourceId(domSource[0].id)

    if (!note) {
      toastError(t('note.findNoteError'))
      NoteBarStyle.close()
    } else {
      set(tags, TagAction.toTag(note.tag))
      noteRichAction.setNotes(note)
    }
  } catch (err) {
    toastError(`${t('note.getNoteFail')}：${err}`)
  } finally {
    setLoading(false)
  }

}

async function submit() {
  const value = get(textareaValue)
  if (!value && get(tags).length === 0) {
    toastWarning(t('note.writeYouNore'))
    return
  }
  try {
    if (get(submitLoading)) return
    setSubmitLoading(true)
    if (NoteBarStyle.isPainted) {
      // 新增，之前有高亮,但无笔记内容
      await noteRichAction.addInNoNotes(get(tags))
    } else {
      // 第一次新增，无高亮
      await noteRichAction.firstAdd(get(source), get(tags), props.book)
    }
  } catch (error) {
    console.log(error)
  } finally {
    setSubmitLoading(false)
    NoteBarStyle.close()
  }

}

// 删除
async function remove(_: NoteText, index: number) {
  noteRichAction.remove(index)
}

onMounted(() => {
  textareatRef.value?.focus()
})

init()

</script>

<template>
  <div class="fixed inset-0 transition ease-in-out">
    <div
      class="card w-96 bg-base-100 border border-primary absolute bottom-8 cursor-pointer bar-shadow select-none max-h-full overflow-auto"
      :style="style" ref="cardRef">
      <div class="card-body">
        <div class="flex flex-row justify-between items-center mb-2">
          <h3 class="font-bold text-lg">{{ t('note.myNote') }}</h3>
          <div @click="closeNoteRich()"> <kbd class="kbd">Esc</kbd></div>
        </div>
        <SkeletonView v-if="loading" />
        <template v-else>
          <SourceListView :data="source" />
          <NoteListView class-name="rounded-md" :data="noteList" @remove="remove" />
          <textarea ref="textareatRef" v-model="textareaValue" rows="6"
            class="textarea textarea-accent w-full bg-base-200 my-3 rounded-lg"
            :placeholder="t('note.placeholder')"></textarea>
          <div>
            <TagInputView v-model="tags" />
          </div>
          <div class="card-actions justify-end">
            <button class="btn btn-success" @click="submit">
              <span class="loading loading-spinner" v-if="submitLoading"></span>
              {{ t('common.add') }}</button>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bar-shadow {
  box-shadow: 0 10px 50px 0 rgba(0, 0, 0, .1);
}
</style>