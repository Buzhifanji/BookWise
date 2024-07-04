<script setup lang="ts">
import { Note } from '@renderer/batabase';
import { t } from '@renderer/view/setting';
import dayjs from 'dayjs';
import TagListView from '../../tag/TagList.vue';
import { TagAction } from '../../tag/action';
import NoteView from '../Note.vue';
import { NoteAction, NoteText } from '../action';

defineProps<{ note: Note, noteList: NoteText[], bookName: string }>()

// 跳转
const jump = (value: Note) => NoteAction.jumpToBook(value)
</script>

<template>
  <div v-if="note.createTime">
    {{ dayjs(note.createTime).format('L LT') }}
  </div>
  <div class="prose">
    <blockquote class="my-[1em] ">
      <p class=" my-[0.6em]" v-for="item in NoteAction.getDomSource(note.domSource)">{{ item.text }}</p>
    </blockquote>
  </div>
  <!-- 笔记内容 -->
  <NoteView :data="noteList" :show-remove="false" v-if="noteList.length" />
  <!-- 笔记标签 -->
  <div v-if="TagAction.toTag(note.tag).length" class="pt-2 flex flex-wrap flex-row gap-2">
    <TagListView :tag="TagAction.toTag(note.tag)" :show="false" />
  </div>
  <div class="pt-2 text-right">
    <span class="text-base-content/70">{{ t('common.comeFrom') }}----</span>
    <a class="link link-accent" @click="jump(note)">{{ bookName }}</a>
  </div>
</template>