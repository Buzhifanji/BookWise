<script setup lang="ts">
import { Note } from '@renderer/batabase';
import { computed, defineProps, onMounted, ref, toRaw, withDefaults } from 'vue';
import { Ellipsis } from 'lucide-vue-next';

defineProps<{data: Note}>()
</script>

<template>
  <div class="card bg-base-100 cursor-pointer  w-96 prose">
    <div class="card-body">
        <div class="flex flex-row item-center justify-between">
            <div>{{ data.createTime }}</div>
            <button class="btn btn-ghost btn-sm">
                <Ellipsis />
</button>
        </div>
        <blockquote class="my-[1em]"> 
            <p class="my-[0.6em]">
                {{  data.bookText }}
            </p>
        </blockquote>
    </div>
  </div>
</template>