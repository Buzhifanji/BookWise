<script setup lang="ts">
import { Book } from '@renderer/batabase';
import { t } from '@renderer/data';
import { useDialog } from '@renderer/hooks';
import { convertUint8ArrayToURL, fileToUint8Array, toastError } from '@renderer/shared';
import { vOnClickOutside } from '@vueuse/components';
import { get, set } from '@vueuse/core';
import { useForm } from 'vee-validate';
import { nextTick, ref } from 'vue';
import { NoteAction } from '../../note/action';
import { BookAction } from '../action';

const props = defineProps<{ book: Book }>()

const { dialogRef, openDialog, closeDialog } = useDialog();
type editeData = { name: string, author: string }

const { defineField, handleSubmit, errors: editeError } = useForm<editeData>({
  validationSchema: {
    name: (value: unknown) => value ? true : t('book.needBookName'),
    author: (value: unknown) => value ? true : t('book.needAuhor'),
  },
});
const [name, nameProps] = defineField('name')
const [author, authorProps] = defineField('author')
const initEdite = async () => {
  name.value = props.book.name
  author.value = props.book.author
  openDialog()
  await nextTick()
  openDialog()
}

const inputRef = ref<HTMLInputElement | null>(null)
const cover = ref(props.book.cover)
async function uploadCover(event: Event) {
  try {
    const files = (event.target as HTMLInputElement).files;
    if (files === null) return
    const res = await fileToUint8Array(files[0])
    set(cover, res)
  } catch (err) {
    toastError(`book.uploadCoverFial：${err}`)
  } finally {
    if (inputRef.value) {
      inputRef.value.value = ''
    }

  }
}

const submitEdite = handleSubmit(values => {
  const { id, name } = props.book

  BookAction.update(id, { ...values, cover: get(cover) })

  // 更新了书名
  if (name !== values.name) {
    NoteAction.updateBookName(id, values.name)
  }
  closeDialog()
});

initEdite()
</script>

<template>
  <dialog class="modal" ref="dialogRef">
    <div class="modal-box max-w-5xl" v-on-click-outside="closeDialog" @contextmenu.prevent>
      <div class="flex flex-row justify-between items-center mb-5">
        <h3 class="font-bold text-lg">{{ t('common.edit') }}</h3>
        <div @click="closeDialog"> <kbd class="kbd cursor-pointer">Esc</kbd></div>
      </div>
      <form @submit="submitEdite">
        <div class="flex flex-row gap-6">
          <div class="flex flex-col items-center">
            <div class="h-[120px] w-[100px] mb-2">
              <img :src="convertUint8ArrayToURL(cover)" class="w-full h-full rounded object-cover"
                :alt="t('book.cover')">
            </div>
            <label>
              <a type="button" value="Input" class="btn btn-sm btn-neutral">
                {{ t('book.uploadCover') }}
              </a>
              <input type="file" ref="inputRef" accept="image/*" class="hidden" @change="uploadCover">
            </label>
          </div>
          <div class="flex-1">
            <div>
              <label class="input input-bordered flex items-center gap-2" for="name"
                :class="{ 'input-error': editeError.name }">
                {{ t('book.name') }}
                <input type="text" class="grow" name="name" v-model="name" v-bind="nameProps"
                  :placeholder="t('book.needBookName')" />
              </label>
              <div class="label" v-if="editeError.name">
                <span class="label-text text-error">{{ editeError.name }}</span>
              </div>
            </div>
            <div class="mt-6">
              <label class="input input-bordered flex items-center gap-2" :class="{ 'input-error': editeError.author }">
                {{ t('book.author') }}
                <input type="text" class="grow" name="author" v-model="author" v-bind="authorProps"
                  :placeholder="t('book.needAuhor')" />
              </label>
              <div class="label" v-if="editeError.author">
                <span class="label-text text-error">{{ editeError.author }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-action">
          <button class="btn btn-outline " @click="closeDialog">{{ t('common.cancel') }}</button>
          <button class="btn btn-success ml-4" type="submit">{{ t('common.sure') }}</button>
        </div>
      </form>
    </div>
  </dialog>
</template>