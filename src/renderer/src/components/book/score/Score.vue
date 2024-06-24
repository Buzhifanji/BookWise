<script setup lang="ts">
import { Book } from '@renderer/batabase';
import { useDialog } from '@renderer/hooks';
import { isUndefined } from '@renderer/shared';
import { vOnClickOutside } from '@vueuse/components';
import { useForm } from 'vee-validate';
import { nextTick } from 'vue';
import { BookAction } from '../action';
import ScoreInput from './ScoreInput.vue';

const props = defineProps<{ book: Book }>()

const { dialogRef, openDialog, closeDialog } = useDialog();

const { defineField, handleSubmit, errors } = useForm<{ score: number }>({
  validationSchema: {
    score: (value: unknown) => value || value === 0 ? true : '请输入评分',
  },
});

const [score, scoreProps] = defineField('score')

const initScore = async () => {
  const val = props.book.score
  score.value = isUndefined(val) || val === -1 ? 0 : val
  openDialog()
  await nextTick()
  openDialog()
}

const submitScore = handleSubmit(value => {
  value.score = +value.score.toFixed(1)
  BookAction.update(props.book.id, value)
  closeDialog()
})

const chooseScore = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.tagName === 'INPUT') {
    const index = target.getAttribute('data-index')
    if (index === null) return
    const isHalf = target.classList.contains('mask-half-1')
    score.value = +index - (isHalf ? 0.5 : 0)
  }
}

initScore()
</script>

<template>
  <dialog class="modal" ref="dialogRef">
    <div class="modal-box " v-on-click-outside="closeDialog">
      <div class="flex flex-row justify-between items-center mb-5">
        <h3 class="font-bold text-lg">评分</h3>
        <div @click="closeDialog"> <kbd class="kbd cursor-pointer">Esc</kbd></div>

      </div>
      <form @submit="submitScore">
        <div class="flex flex-col gap-4">
          <div>
            <label class="input input-bordered flex items-center gap-2" for="name">
              书名
              <input type="text" readonly class="grow" name="name" :value="book.name" placeholder="请输入书名" />
            </label>
          </div>
          <div>
            <label class="input input-bordered flex items-center gap-2" for="name"
              :class="{ 'input-error': errors.score }">
              数值
              <input type="number" max="10" min="0" step="0.1" class="grow" name="score" v-model="score"
                v-bind="scoreProps" placeholder="请输入评分" />
            </label>
            <div class="label" v-if="errors.score">
              <span class="label-text text-error">{{ errors.score }}</span>
            </div>
          </div>
          <div class="rating rating-md rating-half" @click="chooseScore">
            <input type="radio" name="rating-10" class="rating-hidden" :checked="score === 0" />
            <ScoreInput :value="score" :readonly="false" />
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