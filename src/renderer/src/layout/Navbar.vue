<script setup lang="ts">
import { BookNavbarSetting, BookNavBarView, FileUploadView, NoteNavbarSetting, NoteNavbarView, searchDialog } from '@renderer/components';
import { t } from '@renderer/data';
import { useWindowSize } from '@vueuse/core';
import { AlignJustify, Search } from 'lucide-vue-next';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const emit = defineEmits<{
  (e: 'toggleSidebar', payload: string): void;
}>();

const toggleSidebar = () => emit('toggleSidebar', '');

const { width } = useWindowSize();

const isSM = computed(() => width.value < 1024);

const dialogRef = ref<InstanceType<typeof FileUploadView> | null>(null);

function uploadAction() {
  dialogRef.value?.open()
}

const routePath = computed(() => router.currentRoute.value.path);



</script>

<template>
  <div role="navigation" aria-label="Navbar" class="navbar z-10 border-b border-base-200 px-3">
    <div class="gap-3 flex-1">
      <!-- 控制侧边栏菜单栏 -->
      <label for="sidbar-drawer" class="cursor-pointer " v-if="isSM">
        <AlignJustify class="w-5 h-5" />
      </label>
      <button aria-label="Leftmenu toggle" class="btn btn-sm btn-square btn-ghost" v-on:click="toggleSidebar" v-else>
        <AlignJustify class="w-5 h-5" />
      </button>
      <!-- 打开搜索框按钮 -->
      <button aria-label="Search button" @click="searchDialog()"
        class="btn hidden h-8 w-28 items-center justify-start gap-3 border-base-content/20 hover:border-transparent hover:bg-base-content/20 sm:flex btn-sm btn-outline">
        <Search class="w-4 h-4" />
      </button>
      <!-- 笔记导航栏 -->
      <NoteNavbarView v-if="routePath.startsWith('/note')" />
      <BookNavBarView v-if="routePath.startsWith('/book')" />
    </div </div>

    <!-- <div class="navbar-center"></div> -->
    <div class=" gap-4">
      <BookNavbarSetting v-if="routePath.startsWith('/book')" />
      <NoteNavbarSetting v-if="routePath.startsWith('/note')" />
      <button class="btn btn-sm btn-primary " @click="uploadAction()">{{ t('file.upload') }}</button>
      <FileUploadView ref="dialogRef" />
    </div>
  </div>
</template>