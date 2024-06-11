<script setup lang="ts">
import { NoteAction, NoteListView } from '@renderer/components';

const noteList = NoteAction.observable()

</script>

<template>
  <NoteListView :data="noteList || []" />
</template>@renderer/components/note/action