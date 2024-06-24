<script setup lang="ts">
import { isUndefined } from '@renderer/shared';
import { computed } from 'vue';

const props = defineProps<{ value: number, readonly: boolean }>()

const score = computed(() => {
  const val = props.value
  if (isUndefined(val)) return 0
  if (val == -1) return 0
  return val
})

const checkedScore = (index: number, isHalf: boolean, val: number) => {
  if (isUndefined(val)) return false
  if (val == -1) return false
  if (val === 0) return false

  if (isHalf) {
    // 0 - 0.5
    if (val > (index - 1) && val <= (index - 0.5)) {
      return true
    } else {
      return false
    }
  } else {
    if (val > (index - 0.5) && val <= index) {
      return true
    } else {
      return false
    }
  }
}
</script>

<template>
  <input type="radio" name="rating-10" class="rating-hidden" :checked="score === 0" />
  <template v-for="item in 10" :key="item">
    <input type="radio" :data-index="item" name="rating-10" class="bg-orange-400 mask mask-star-2 mask-half-1"
      :checked="checkedScore(item, true, score)" :disabled="readonly" />
    <input type="radio" :data-index="item" name="rating-10" class="bg-orange-500 mask mask-star-2 mask-half-2"
      :checked="checkedScore(item, false, score)" :disabled="readonly" />
  </template>
</template>