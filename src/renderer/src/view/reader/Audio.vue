<script setup lang="ts">
import { set } from '@vueuse/core';
import { Howler } from 'howler';
import { Triangle, X } from 'lucide-vue-next';
import { ref, watchEffect } from 'vue';
import { clearAudio, isAudioPlaying, isAudioReadying } from './tts';

const volume = ref(100)

watchEffect(() => {
  Howler.volume(+(volume.value / 100).toFixed(1))
})

const changeVolume = (i: number) => {
  const val = 100 / 4 * i
  set(volume, val)
}

const onClose = () => {
  set(isAudioPlaying, false)
  set(isAudioReadying, false)
  clearAudio()
}

</script>

<template>
  <div class="card bg-base-300 w-48 cursor-pointer shadow-lg fixed bottom-8 right-8">
    <div class="card-body p-5">
      <div class="card-actions justify-end" v-if="!isAudioReadying">
        <button class="btn btn-square btn-sm" @click="onClose()">
          <X />
        </button>
      </div>
      <div class="flex flex-col items-center gap-4 ">
        <div class="avatar placeholder ">
          <div
            class="bg-neutral text-neutral-content ring-primary ring-offset-base-100 w-16 rounded-full ring ring-offset-2 ">
            <Triangle class="animate-spin" v-if="isAudioPlaying" />
            <span class="loading loading-ring" v-else></span>
          </div>
        </div>
        <div class="w-full" v-if="!isAudioReadying">
          <input type="range" min="0" max="100" v-model="volume" class="range range-sm range-accent" />
          <div class="flex w-full justify-between px-2 text-xs">
            <span v-for="_, index in 5" @click="changeVolume(index)">|</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>