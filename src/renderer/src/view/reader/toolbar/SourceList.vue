<script setup lang="ts">
import { DomSource } from '@book-wise/web-highlight';
import { settingStore } from '@renderer/store';
import { get, set } from '@vueuse/core';
import { ref, watchEffect } from 'vue';

const porps = withDefaults(defineProps<{ 
  data: DomSource[], 
  opacity?: number,
  auto?: boolean,
   className?: string
   }>(), {
  data: () => [],
  opacity: 1,
  className: 'rounded-md',
  auto: true,
})

const _className = ref('')
const setName = () => set(_className, porps.data[0].className)
const removeName = () => set(_className, '')

const onMouseEnter = () => {
  const show = get(settingStore).isNoteShowClass
  if(show) {
    setName()
    return
  }

  setName()
}

const onMouseLeave = () => {
  const show = get(settingStore).isNoteShowClass
  if(show) {
    setName()
    return
  }
  
  if(porps.auto) {
    removeName()
  }

}

watchEffect(() => {
  const show = get(settingStore).isNoteShowClass
  if(show) {
    setName()
  } else {
     if(!porps.auto) {
        if(porps.opacity === 1) {
          removeName()
        } else {
          setName()
        }
     }
  }
})

</script>

<template>
  <template v-if="data.length > 0">
    <div class="bg-base-200 text-base-content p-3 " :class="[_className, className,]" @mouseover="onMouseEnter" @mouseleave="onMouseLeave" :style="{ '--tw-bg-opacity': opacity }">
      <div class="flex flex-row gap-4">
        <div class="flex">
          <div class="divider divider-primary h-full w-[3px] flex-col m-0 py-1"></div>
        </div>
        <blockquote>
          <p v-for="item in data">
            {{ item.text }}
          </p>
        </blockquote>
      </div>
    </div>
  </template>
</template>