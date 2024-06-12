<script setup lang="ts">

interface Props {
  title: string
  desc: string
}

defineProps<Props>()

const model = defineModel()

const textOpacity = { '--tw-text-opacity': 0.6 };

</script>

<template>
  <div class="form-control">
    <label class="cursor-pointer label">
      <div>
        <h3 class="font-bold text-xl">{{ title }}</h3>
        <p class="label-text font-normal mt-1 " :style="textOpacity">{{ desc }}</p>
      </div>
      <input type="checkbox" v-model="model" class="checkbox checkbox-info" />
    </label>
  </div>
</template>