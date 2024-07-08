<script setup lang="ts">
import { Book } from '@renderer/batabase';
import { BookshelfAction, TagItem } from '@renderer/components';
import { useDialog } from '@renderer/hooks';
import { toastError, toastSuccess } from '@renderer/shared';
import { t } from '@renderer/view/setting';
import { vOnClickOutside } from '@vueuse/components';
import { get, set, useToggle } from '@vueuse/core';
import { computed, nextTick, ref } from 'vue';
import { BookAction } from '../book/action';
import SelectSearchView from '../select/SelectSearch.vue';
import TagListview from '../tag/TagList.vue';

const props = defineProps<{ book: Bookshelf }>()
const [loading, setLoading] = useToggle(false)

const { dialogRef, openDialog, closeDialog } = useDialog();

const selectBookshelf = ref<TagItem[]>([])

const removeBookshelf = (i: number) => selectBookshelf.value.splice(i, 1)
const updateBookshelf = (val: TagItem[]) => set(selectBookshelf, [val[val.length - 1]])

const allBookshelf = BookshelfAction.observable()

const bookshelfList = computed(() => (get(allBookshelf) || []).map(item => ({ id: item.id, value: item.name })))

const addBookshelf = async (val: string) => {
  setLoading(true)
  let result = get(allBookshelf).find(item => item.name === val)
  if (!result) {
    result = await BookshelfAction.add(val)

  }
  await BookAction.update(props.book.id, { groupId: result.id, groupName: val })

  setLoading(false)
  set(selectBookshelf, [{ id: result.id, value: result.name }])
  return { id: result.id, value: result.name }
}


const init = async () => {
  openDialog()
  await nextTick()
  openDialog()
}

const submit = async () => {
  try {
    if (get(loading)) return
    const val = get(selectBookshelf)
    setLoading(true)

    if (val.length === 0) {
      await BookAction.update(props.book.id, { groupId: '', groupName: '' })
      toastSuccess('移除书架成功')
    } else {
      await BookAction.update(props.book.id, { groupId: val[0].id, groupName: val[0].value })
      toastSuccess(t('book.addToBookshelfSuccess'))
    }

    closeDialog()
  } catch (err) {
    toastError(`${t('book.addToBookshelfFail')}: ${err}`)
  } finally {
    setLoading(false)
  }
}

init()
</script>

<template>
  <dialog class="modal" ref="dialogRef">
    <div class="modal-box max-w-fit" v-on-click-outside="closeDialog" @contextmenu.prevent>
      <div class="flex flex-row justify-between items-center mb-5">
        <h3 class="font-bold text-lg">{{ t('book.addToBookshelf') }}</h3>
        <div @click="closeDialog"> <kbd class="kbd cursor-pointer">Esc</kbd></div>
      </div>
      <form>
        <div class="flex flex-col gap-2">
          <div class="min-h-12 px-4 rounded-lg bg-base-200 flex flex-row gap-2 items-center">
            <span>{{ t('book.name') }}</span>
            <div class="flex-1">{{ book.name }}</div>
          </div>
          <div class="mt-6">
            <SelectSearchView :model-value="selectBookshelf" :placeholder="t('book.needBookshelfName')"
              @update:model-value="updateBookshelf" :data="bookshelfList" :add="addBookshelf">
              <span>{{ t('book.bookshelf') }}</span>
              <TagListview :tag="selectBookshelf" @remove="removeBookshelf" />
            </SelectSearchView>
          </div>
        </div>
        <div class="modal-action">
          <button class="btn btn-outline" type="button" @click="closeDialog">{{ t('common.cancel') }}</button>
          <button class="btn btn-success ml-4" type="button" @click="submit">
            <span class="loading loading-spinner" v-if="loading"></span>
            {{ t('common.sure') }}</button>
        </div>
      </form>
    </div>
  </dialog>
</template>