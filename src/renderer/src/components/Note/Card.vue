<script setup lang="ts">
import { Note } from '@renderer/batabase';
import { NoteAction } from '@renderer/components';
import { settingStore } from '@renderer/store';
import { BellElectric, Ellipsis, Trash2 } from 'lucide-vue-next';
import { defineProps, ref } from 'vue';

const props = defineProps<{ data: Note }>()

const emit = defineEmits<{
    (e: 'delete', data: Note): void,
    (e: 'detail', data: Note): void,
    (e: 'jump', data: Note): void,
}>()

const getColorName = () => {
    const source = NoteAction.getDomSource(props.data.domSource)[0]
    return source ? source.className : ''
}

const className = ref(settingStore.value.isNoteShowClass ? getColorName() : '')

const onMouseEnter = () => className.value = getColorName()
const onMouseLeave = () => className.value = ''

</script>

<template>
    <div class="card rounded-md shadow-md bg-base-100 cursor-pointer text-sm  w-96 prose">
        <div class="card-body">
            <div class="flex flex-row item-center justify-between">
                <div>{{ data.createTime }}</div>
                <div class="dropdown dropdown-end">
                    <button class="btn btn-ghost btn-sm">
                        <Ellipsis class="w-5 h-5" />
                    </button>
                    <ul tabindex="0"
                        class="dropdown-content z-[1] menu p-2  shadow-2xl border  badge-primary badge-outline bg-base-100 rounded-md w-48">
                        <li @click="emit('delete', data)">
                            <a class="text-error no-underline">
                                <Trash2 class="h-5 w-5" />删除
                            </a>
                        </li>
                        <li @click="emit('detail', data)">
                            <a class="no-underline">
                                <BellElectric class="h-5 w-5" />详情
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div @click="emit('jump', data)" v-if="settingStore.isNoteShowClass">
                <blockquote class="my-[1em]" :class="className">
                    <p class="my-[0.6em] line-clamp-3" v-for="item in NoteAction.getDomSource(data?.domSource)">
                        {{ item.text }}
                    </p>
                </blockquote>
                <p class="my-[0.6em] line-clamp-3">
                    有益的。在这次的版本中，我们提供了许多机会让读者自己用不同方式去尝试。关于为什么这种方法有时有效果，有时却没有效果，尽管我们已经有了一些更好的想法，却依然没有一个可靠的解释。表达性书写研究社群由临床心理学家、社会心理学家、健康心理学家、认知心理学家、社会工作者、医生以及一些从事
                </p>
            </div>
            <div @click="emit('jump', data)" v-else>
                <blockquote class="my-[1em] " :class="className" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
                    <p class="my-[0.6em] line-clamp-3" v-for="item in NoteAction.getDomSource(data?.domSource)">
                        {{ item.text }}
                    </p>
                </blockquote>
                <p class="my-[0.6em] line-clamp-3">
                    有益的。在这次的版本中，我们提供了许多机会让读者自己用不同方式去尝试。关于为什么这种方法有时有效果，有时却没有效果，尽管我们已经有了一些更好的想法，却依然没有一个可靠的解释。表达性书写研究社群由临床心理学家、社会心理学家、健康心理学家、认知心理学家、社会工作者、医生以及一些从事
                </p>
            </div>
        </div>
    </div>
</template>