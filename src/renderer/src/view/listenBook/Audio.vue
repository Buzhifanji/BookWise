<script setup lang="ts">
import { ListenBookLanguageView, Sound } from '@renderer/components';
import { BookRender, listenBookBus, TTSbus } from '@renderer/hooks';
import { spliteSentence } from '@renderer/shared';
import { edgeTSS } from '@renderer/tts';
import { edgeVoiceList } from '@renderer/tts/edge-tts/edgeVoiceList';
import { get, set } from '@vueuse/core';
import { Triangle, X } from 'lucide-vue-next';
import SparkMD5 from 'spark-md5';
import { v4 as uuidv4 } from 'uuid';
import { ref } from 'vue';

const isAudioReadying = ref(false) // 是否准备中
const isAudioPlaying = ref(false) // 是否播放中
const sound = new Sound()
const textList: { id: string, value: string }[] = []
let activeText = 0;
const audiosMap = new Map<string, ArrayBuffer>()
const bookInfo = BookRender.bookInfo
const isPlaying = sound.isPlaying
const volume = sound.volume
const bookLanguageRef = ref<InstanceType<typeof ListenBookLanguageView>>()
let cacheText: string = ''
const closeBookLanguage = (language: string) => {
  playAction(cacheText, language)
}

function getVoiceList(lang: string) {
  const language = lang.startsWith('zh') ? 'zh' : lang
  const voices: string[] = []
  for (const key in edgeVoiceList) {
    if (key.startsWith(language)) {
      voices.push(...edgeVoiceList[key])
    }
  }
  return voices[0]
}

async function playAction(input: string, language: string) {
  const text = spliteSentence(input)
  textList.length = 0
  text.forEach(item => {
    textList.push({
      id: SparkMD5.hash(item),
      value: item
    })
  })
  activeText = 0

  const voice = getVoiceList(language)
  if (voice) {
    set(isAudioReadying, true)
    for (let i = 0; i < text.length; i++) {
      const connectId = uuidv4().replaceAll('-', '') as string
      let res: any
      try {
        res = await edgeTSS({ payload: { input: textList[i].value, connectId, options: { voice } } })
        audiosMap.set(textList[i].id, res)
      } catch (_) {
      }

      if (i === 0) {
        sound.clear()
        set(isAudioReadying, false)
        set(isAudioPlaying, true)
        if (res) {
          sound.play(res)
        } else {
          sound.play(text[i])
        }
      }
    }
  } else {
    sound.clear()
    sound.play(input)
    set(isAudioPlaying, true)
  }
}

TTSbus.on((val) => {
  if (val === 'next') {
    if (activeText < textList.length - 1) {
      activeText++
      const val = textList[activeText]
      set(isAudioPlaying, true)
      if (audiosMap.has(val.id)) {
        sound.play(audiosMap.get(val.id)!)
      } else {
        sound.play(val.value)
      }
    } else {
      onClose()
    }
  }
})

listenBookBus.on((val) => {
  console.log(val)
  if (val) {
    playAction(val, get(bookInfo)!.language)
  } else {
    cacheText = val
    get(bookLanguageRef)?.open()
  }
})

const changeVolume = (i: number) => {
  const val = 100 / 4 * i
  set(volume, val)
}

const onClose = () => {
  sound.clear()
  set(isAudioReadying, false)
  set(isAudioPlaying, false)
}

</script>

<template>
  <ListenBookLanguageView :id="bookInfo!.id" ref="bookLanguageRef" :close="closeBookLanguage" />
  <div class="card bg-base-300 w-48 cursor-pointer shadow-lg fixed bottom-8 right-8"
    v-if="isAudioReadying || isAudioPlaying">
    <div class="card-body p-5">
      <div class="card-actions justify-end" v-if="!isAudioReadying">
        <button class="btn btn-square btn-sm" @click="onClose()">
          <X />
        </button>
      </div>
      <div class="flex flex-col items-center gap-4 ">
        <div class="avatar placeholder" @click="sound.toggle()">
          <div
            class="bg-neutral text-neutral-content ring-primary ring-offset-base-100 w-16 rounded-full ring ring-offset-2 ">

            <span class="loading loading-ring" v-if="isAudioReadying"></span>
            <Triangle :class="{ 'animate-spin': isPlaying }" v-else />

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