<script setup lang="ts">
import { Select } from '@renderer/components';
import { ref } from 'vue';
import { languageStore } from './language';
import { themeStore } from './theme';

const selectedTheme = ref(themeStore.getDefault(themeStore.list[0]));
const selectedLang = ref(languageStore.getDefault(languageStore.list[0]))

const textOpacity = { '--tw-text-opacity': 0.6 };

</script>

<template>
  <div class="p-6 grid grid-cols-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-screen-2xl">
    <div class="col-span-full">
      <h2 class="font-bold text-lg ">
        {{ $t('setting.userSetting') }}
      </h2>
    </div>
    <div class="col-span-full lg:col-auto">
      <div class="card w-full bg-base-100 shadow">
        <div class="card-body">
          <h2 class="card-title">{{ $t('setting.language') }} & {{ $t('setting.theme') }}</h2>
          <label class="form-control w-full max-w-xs">
            <div class="label">
              <span class="label-text" :style="textOpacity">{{ $t('setting.chooseLanguage') }}</span>
            </div>
            <Select v-model="selectedLang" :list="languageStore.list" @update:model-value="languageStore.set" />
          </label>
          <label class="form-control w-full max-w-xs">
            <div class="label">
              <span class="label-text" :style="textOpacity">{{ $t('setting.chooseTheme') }}</span>
            </div>
            <Select v-model="selectedTheme" :list="themeStore.list" @update:model-value="themeStore.set" />
          </label>
        </div>
      </div>
    </div>
    <div class="col-span-full lg:col-span-2">
      <div class="card bg-base-100 shadow w-full">
        <div class="card-body">
          <div class="form-control">
            <label class="cursor-pointer label">
              <div>
                <h3 class="font-bold text-xl">sssss</h3>
                <p class="label-text font-normal" :style="textOpacity">Remember me</p>
              </div>
              <input type="checkbox" checked="checked" class="checkbox checkbox-info" />
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>