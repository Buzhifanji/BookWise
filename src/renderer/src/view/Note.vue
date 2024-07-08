<script setup lang="ts">
import { NoteListView } from '@renderer/components';
import { useNoteStore } from '@renderer/store';

const noteStore = useNoteStore()

</script>

<template>
  <NoteListView :data="noteStore.noteList" />
</template>