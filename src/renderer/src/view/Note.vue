<script setup lang="ts">
import { Note, db } from '@renderer/batabase';
import NoteListView from '@renderer/components/note/NoteList.vue';
import { useObservable } from '@vueuse/rxjs';
import { liveQuery } from 'dexie';

const noteList = useObservable<Note[], Note[]>((liveQuery(async () => (await db.notes.toArray()).filter(item => !item.isDelete))) as any)

</script>

<template>
  <NoteListView :data="noteList || []" />
</template>