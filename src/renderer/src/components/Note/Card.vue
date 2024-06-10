<script setup lang="ts">
import { Note } from '@renderer/batabase';
import { defineProps} from 'vue';
import { Ellipsis } from 'lucide-vue-next';

defineProps<{data: Note}>()
</script>

<template>
  <div class="card bg-base-100 cursor-pointer text-sm  w-96 prose">
    <div class="card-body">
        <div class="flex flex-row item-center justify-between">
            <div>{{ data.createTime }}</div>
            <div class="dropdown dropdown-end">
                <button  tabindex="0" class="btn btn-ghost btn-sm">
                    <Ellipsis />
                </button>
                <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow-lg border bg-base-100 rounded-md w-52">
                    <li><a>Item 1</a></li>
                    <li><a>Item 2</a></li>
                </ul>
            </div>
        </div>
        <blockquote class="my-[1em] hover:bg-secondary hover:text-secondary-content"> 
            <p class="my-[0.6em] line-clamp-3">
                {{  data.bookText }}
            </p>
        </blockquote>
    </div>
  </div>
</template>