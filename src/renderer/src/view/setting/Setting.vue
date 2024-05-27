<script setup lang="ts">
import { Select } from '@renderer/components';
import { ref } from 'vue';
import { languageStore } from './language';
import { themeStore } from './theme';

const selectedTheme = ref(themeStore.getDefault(themeStore.list[0]));
const selectedLang = ref(languageStore.getDefault(languageStore.list[0]))

</script>

<template>
  <div class="p-6 grid grid-cols-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <div class="col-span-full">
      <h2 class="font-bold text-lg ">
        用户设置
      </h2>
    </div>
    <div class="col-span-full lg:col-auto">
      <div class="card w-96 bg-base-100 shadow">
        <div class="card-body">
          <h2 class="card-title">语言 & 主题</h2>
          <label class="form-control w-full max-w-xs">
            <div class="label">
              <span class="label-text">选择语言</span>
            </div>
            <Select v-model="selectedLang" :list="languageStore.list" @update:model-value="languageStore.set" />
          </label>
          <label class="form-control w-full max-w-xs">
            <div class="label">
              <span class="label-text">选择主题</span>
            </div>
            <Select v-model="selectedTheme" :list="themeStore.list" @update:model-value="themeStore.set" />
          </label>
        </div>
      </div>
    </div>
  </div>
</template>