<script setup lang="ts">
import { Bookshelf } from '@renderer/batabase';
import { useDialog } from '@renderer/hooks';
import { toastError } from '@renderer/shared';
import { useBookStore } from '@renderer/store';
import { t } from '@renderer/view/setting';
import { vOnClickOutside } from '@vueuse/components';
import { get, set, useToggle } from '@vueuse/core';
import { nextTick, ref } from 'vue';
import { BookAction } from '../book/action';
import SkeletonView from '../loading/Skeleton.vue';
import { BookshelfAction } from './action';

const [loading, setLoading] = useToggle(false)
const [submitLoading, setSubmitLoading] = useToggle(false)
const { dialogRef, openDialog, closeDialog } = useDialog();
const { dialogRef: RenameDialogRef, openDialog: openRenameDialog, closeDialog: closeRenameDialog } = useDialog();
const bookStore = useBookStore()

const activeBookshelf = ref<Bookshelf | null>(null)
const inputVal = ref<string>('')
const editBookshelf = (val: Bookshelf) => {
  set(activeBookshelf, val)
  set(inputVal, val.name)
  openRenameDialog()
}

const allBookshelf = ref<Bookshelf[]>([])
const bookMap = new Map<string, { count: number, bookId: string }>()

const init = async () => {
  try {
    setLoading(true)
    openDialog()
    await nextTick()
    openDialog()
    const bookshelf = await BookshelfAction.getAll()

    for (const item of bookStore.bookList) {
      const bookshelfId = item.groupId
      if (bookshelfId) {
        const temp = bookMap.get(bookshelfId) || { count: 0, bookId: '' }
        temp.bookId = item.id
        temp.count++
        bookMap.set(bookshelfId, temp)
      }
    }

    set(allBookshelf, bookshelf)

  } catch (err) {
    console.log(err)
    toastError(`获取书架列表失败: ${err}`)
  } finally {
    setLoading(false)
  }
}

const onLoad = async () => {
  const res = await BookshelfAction.getAll()
  set(allBookshelf, res)
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
    const { name, id } = active
    if (name !== val) {
      await BookshelfAction.update(id, val)

      // 更新绑定的书籍
      const oldInfo = bookMap.get(id)
      if (oldInfo) {
        await BookAction.update(oldInfo.bookId, { groupName: val })
      }

      await onLoad()
    }
    closeRenameDialog()
  } catch (err) {
    toastError(`重命名书架失败：${err}`)
  } finally {
    setSubmitLoading(false)
  }
}

// 一键清空空书架
const onClearEmpty = async () => {
  const ids = get(allBookshelf).filter(item => !bookMap.has(item.id)).map(item => item.id)
  if (!ids.length) return
  await BookshelfAction.removeByIds(ids)
  await onLoad()
}

// 删除
const onRemove = async (val: Bookshelf) => {
  await BookshelfAction.removeByIds([val.id])

  const oldInfo = bookMap.get(val.id)
  if (oldInfo) {
    await BookAction.update(oldInfo.bookId, { groupName: '', groupId: '' })
  }

  await onLoad()
}

init()
</script>

<template>
  <dialog class="modal" ref="dialogRef">
    <div class="modal-box max-w-3xl" v-on-click-outside="closeDialog" @contextmenu.prevent>
      <div class="flex flex-row justify-between items-center mb-5">
        <h3 class="font-bold text-lg">管理书架</h3>
        <div @click="closeDialog"> <kbd class="kbd cursor-pointer">Esc</kbd></div>
      </div>
      <SkeletonView v-if="loading" />
      <template v-else>
        <form v-if="allBookshelf.length">
          <div class="overflow-x-auto">
            <table class="table">
              <thead>
                <tr>
                  <th></th>
                  <th>名字</th>
                  <th>书籍数量</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr class="hover" v-for="item, index in allBookshelf">
                  <th>{{ index + 1 }}</th>
                  <td>{{ item.name }}</td>
                  <td>{{ bookMap.get(item.id)?.count || 0 }}</td>
                  <td>
                    <div class="join join-horizontal">
                      <button class="btn btn-sm btn-outline join-item" @click="editBookshelf(item)">
                        修改
                      </button>
                      <button class="btn btn-sm btn-outline btn-error join-item" @click="onRemove(item)">
                        删除
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="modal-action justify-between">
            <button class="btn  btn-success" @click="onClearEmpty()">一键清空空书架</button>
            <button class="btn btn-outline" type="button" @click="closeDialog">{{ t('common.close') }}</button>
          </div>
        </form>
        <div v-else class="flex justify-center my-20 w-full">
          <div class="btn">
            <div class="badge">{{ t('common.empty') }}</div>
          </div>
        </div>
      </template>

      <dialog class="modal" ref="RenameDialogRef">
        <div class="modal-box max-w-fit" v-on-click-outside="closeRenameDialog" @contextmenu.prevent>
          <div class="flex flex-row justify-between items-center mb-5">
            <h3 class="font-bold text-lg">重新命名</h3>
            <div @click="closeRenameDialog"> <kbd class="kbd cursor-pointer">Esc</kbd></div>
          </div>
          <form>
            <label class="input input-bordered flex items-center gap-2">
              {{ t('book.bookshelf') }}
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