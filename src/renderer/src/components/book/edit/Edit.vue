<script setup lang="ts">
import { Book } from '@renderer/batabase';
import { useDialog } from '@renderer/hooks';
import { convertUint8ArrayToURL, fileToUint8Array, toastError } from '@renderer/shared';
import { vOnClickOutside } from '@vueuse/components';
import { get, set } from '@vueuse/core';
import { useForm } from 'vee-validate';
import { nextTick, ref } from 'vue';
import { BookAction } from '../action';

const props = defineProps<{ book: Book }>()

const { dialogRef, openDialog, closeDialog } = useDialog();

type editeData = { name: string, author: string }

const { defineField, handleSubmit, errors: editeError } = useForm<editeData>({
  validationSchema: {
    name: (value: unknown) => value ? true : '请输入书名',
    author: (value: unknown) => value ? true : '请输入作者名',
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
    toastError(`上传封面失败：${err}`)
  } finally {
    if (inputRef.value) {
      inputRef.value.value = ''
    }
  }
}

const submitEdite = handleSubmit(values => {
  BookAction.update(props.book.id, { ...values, cover: get(cover) })
  closeDialog()
});

initEdite()
</script>

<template>
  <dialog class="modal" ref="dialogRef">
    <div class="modal-box max-w-5xl" v-on-click-outside="closeDialog" @contextmenu.prevent>
      <div class="flex flex-row justify-between items-center mb-5">
        <h3 class="font-bold text-lg">编辑</h3>
        <div @click="closeDialog"> <kbd class="kbd cursor-pointer">Esc</kbd></div>
      </div>
      <form @submit="submitEdite">
        <div class="flex flex-row gap-6">
          <div>
            <div class="h-[120px] w-[100px] mb-2">
              <img :src="convertUint8ArrayToURL(cover)" class="w-full h-full rounded object-cover" alt="书籍封面">
            </div>
            <label>
              <a type="button" value="Input" class="btn btn-sm btn-outline btn-info">
                上传封面
              </a>
              <input type="file" ref="inputRef" accept="image/*" class="hidden" @change="uploadCover">
            </label>
          </div>
          <div class="flex-1">
            <div>
              <label class="input input-bordered flex items-center gap-2" for="name"
                :class="{ 'input-error': editeError.name }">
                书名
                <input type="text" class="grow" name="name" v-model="name" v-bind="nameProps" placeholder="请输入书名" />
              </label>
              <div class="label" v-if="editeError.name">
                <span class="label-text text-error">{{ editeError.name }}</span>
              </div>
            </div>
            <div class="mt-6">
              <label class="input input-bordered flex items-center gap-2" :class="{ 'input-error': editeError.author }">
                作者
                <input type="text" class="grow" name="author" v-model="author" v-bind="authorProps"
                  placeholder="请输入作者名" />
              </label>
              <div class="label" v-if="editeError.author">
                <span class="label-text text-error">{{ editeError.author }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-action">
          <button class="btn btn-outline " @click="closeDialog">取消</button>
          <button class="btn btn-success ml-4" type="submit">确认</button>
        </div>
      </form>
    </div>
  </dialog>
</template>