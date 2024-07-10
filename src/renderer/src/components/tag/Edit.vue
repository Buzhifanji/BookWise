<script setup lang="ts">
import { Tag } from '@renderer/batabase';
import { t } from '@renderer/data';
import { useDialog } from '@renderer/hooks';
import { toastError } from '@renderer/shared';
import { useNoteStore, useTagStore } from '@renderer/store';
import { vOnClickOutside } from '@vueuse/components';
import { get, set, useToggle } from '@vueuse/core';
import { nextTick, ref } from 'vue';
import SkeletonView from '../loading/Skeleton.vue';
import { NoteAction } from '../note/action';
import { TagAction } from './action';

const [loading, setLoading] = useToggle(false)
const [submitLoading, setSubmitLoading] = useToggle(false)
const { dialogRef, openDialog, closeDialog } = useDialog();
const { dialogRef: RenameDialogRef, openDialog: openRenameDialog, closeDialog: closeRenameDialog } = useDialog();
const noteStore = useNoteStore()
const tagStore = useTagStore()

const activeBookshelf = ref<Tag | null>(null)
const inputVal = ref<string>('')
const onEdit = (val: Tag) => {
  set(activeBookshelf, val)
  set(inputVal, val.tagName)
  openRenameDialog()
}

const noteMap = new Map<string, { count: number, ids: Set<string> }>()

const init = async () => {
  try {
    setLoading(true)
    openDialog()
    await nextTick()
    openDialog()

    for (const item of noteStore.noteList) {
      const tags = TagAction.toTag(item.tag)
      if (tags.length) {
        for (const tag of tags) {
          const temp = noteMap.get(tag.id) || { count: 0, ids: new Set() }
          temp.ids.add(item.id)
          temp.count++
          noteMap.set(tag.id, temp)
        }
      }
    }
  } catch (err) {
    console.log(err)
    toastError(`${t('tag.getTagListFail')}: ${err}`)
  } finally {
    setLoading(false)
  }
}

// 重命名
const onRename = async () => {
  if (get(submitLoading)) return

  const active = get(activeBookshelf)
  if (!active) {
    closeRenameDialog()
    return
  }

  const val = get(inputVal)
  if (!val) {
    toastError(t('book.needBookshelfName'))
    return
  }

  setSubmitLoading(true)
  try {
    const { tagName, id } = active
    if (tagName !== val) {
      await TagAction.update(id, val)

      // 更新绑定的书籍
      const oldInfo = noteMap.get(id)
      if (oldInfo) {
        const ids = [...oldInfo.ids]
        await Promise.all(ids.map(noteId => {
          const note = noteStore.noteList.find(sub => sub.id === noteId)
          if (note) {
            const temp = TagAction.toTag(note.tag)
            temp.some(tag => {
              if (tag.id == id) {
                tag.tagName = val
                return true
              } else {
                return false
              }
            })
            return NoteAction.update(noteId, { tag: TagAction.toJSON(temp) })
          }
          return null
        }))
      }
    }
    closeRenameDialog()
  } catch (err) {
    toastError(`${t('tag.renameFail')}: ${err}`)
  } finally {
    setSubmitLoading(false)
  }
}

// 一键清空空书架
const onClearEmpty = async () => {
  const ids = tagStore.tagList.filter(item => !noteMap.has(item.id)).map(item => item.id)
  if (!ids.length) return
  await TagAction.removeByIds(ids)
}

// 删除
const onRemove = async (val: Tag) => {
  await TagAction.removeByIds([val.id])

  const oldInfo = noteMap.get(val.id)
  if (oldInfo) {
    const ids = [...oldInfo.ids]
    await Promise.all(ids.map(noteId => {
      const note = noteStore.noteList.find(sub => sub.id === noteId)
      if (note) {
        let temp = TagAction.toTag(note.tag)
        temp = temp.filter(tag => tag.id !== val.id)
        return NoteAction.update(noteId, { tag: TagAction.toJSON(temp) })
      }
      return null
    }))
  }
}

init()
</script>

<template>
  <dialog class="modal" ref="dialogRef">
    <div class="modal-box max-w-3xl overflow-hidden flex flex-col" v-on-click-outside="closeDialog"
      @contextmenu.prevent>
      <div class="flex flex-row justify-between items-center mb-5">
        <h3 class="font-bold text-lg">{{ t('tag.manage') }}</h3>
        <div @click="closeDialog"> <kbd class="kbd cursor-pointer">Esc</kbd></div>
      </div>
      <SkeletonView v-if="loading" />
      <template v-else>
        <form v-if="tagStore.tagList.length" class="flex-1 overflow-auto relative scrollbar-thin">
          <div class="overflow-y-auto ">
            <table class="table table-auto table-pin-rows table-pin-cols">
              <thead>
                <tr>
                  <th></th>
                  <th>{{ t('tag.tagTitle') }}</th>
                  <th>{{ t('note.noteNumber') }}</th>
                  <th>{{ t('common.action') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr class="hover" v-for="item, index in tagStore.tagList">
                  <th>{{ index + 1 }}</th>
                  <td>{{ item.tagName }}</td>
                  <td>{{ noteMap.get(item.id)?.count || 0 }}</td>
                  <td>
                    <div class="join join-horizontal">
                      <button class="btn btn-sm btn-outline join-item" @click="onEdit(item)">
                        {{ t('common.rename') }}
                      </button>
                      <button class="btn btn-sm btn-outline btn-error join-item" @click="onRemove(item)">
                        {{ t('common.remove') }}
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

        </form>
        <div v-else class="flex justify-center my-20 w-full">
          <div class="btn">
            <div class="badge">{{ t('common.empty') }}</div>
          </div>
        </div>
        <div class="modal-action justify-between">
          <button class="btn  btn-success" @click="onClearEmpty()">{{ t('tag.clearEmptyTag') }}</button>
          <button class="btn btn-outline" type="button" @click="closeDialog">{{ t('common.close') }}</button>
        </div>
      </template>

      <dialog class="modal" ref="RenameDialogRef">
        <div class="modal-box max-w-fit" v-on-click-outside="closeRenameDialog" @contextmenu.prevent>
          <div class="flex flex-row justify-between items-center mb-5">
            <h3 class="font-bold text-lg">{{ t('common.rename') }}</h3>
            <div @click="closeRenameDialog"> <kbd class="kbd cursor-pointer">Esc</kbd></div>
          </div>
          <form>
            <label class="input input-bordered flex items-center gap-2">
              {{ t('tag.name') }}
              <input type="text" class="grow" :placeholder="t('book.needBookshelfName')" v-model="inputVal"
                @keydown.enter="onRename" />
            </label>
            <div class="modal-action">
              <button class="btn btn-outline" type="button" @click="closeRenameDialog">{{ t('common.cancel') }}</button>
              <button class="btn btn-success ml-4" type="button" @click="onRename">
                <span class="loading loading-spinner" v-if="submitLoading"></span>
                {{ t('common.sure') }}</button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  </dialog>

</template>