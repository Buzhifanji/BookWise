<script setup lang="ts">
import { Book } from '@renderer/batabase';
import { useDialog } from '@renderer/hooks';
import { useForm } from 'vee-validate';
import { BookAction } from '../action';
import { nextTick } from 'vue';
import { vOnClickOutside } from '@vueuse/components';

const props = defineProps<{book: Book}>()

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
const submitEdite = handleSubmit(values => {
  BookAction.update(props.book.id, values)
  closeDialog()
});

initEdite()
</script>

<template>
      <dialog class="modal" ref="dialogRef">
      <div class="modal-box" v-on-click-outside="closeDialog">
        <div class="flex flex-row justify-between items-center mb-5">
          <h3 class="font-bold text-lg">评分</h3>
          <div @click="closeDialog"> <kbd class="kbd cursor-pointer">Esc</kbd></div>

        </div>
        <form @submit="submitEdite">
            <div class="flex flex-col gap-4">
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
            <div>
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
          <div class="modal-action">
            <button class="btn btn-outline " @click="closeDialog">取消</button>
            <button class="btn btn-success ml-4" type="submit">确认</button>
          </div>
        </form>
      </div>
    </dialog>
</template>