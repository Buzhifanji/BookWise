<script setup lang="ts">
import { Book, Bookshelf } from '@renderer/batabase';
import { BookshelfAction } from '@renderer/components';
import { useDialog } from '@renderer/hooks';
import { toastError, toastSuccess } from '@renderer/shared';
import { t } from '@renderer/view/setting';
import { vOnClickOutside } from '@vueuse/components';
import { get, set, useThrottleFn, useToggle } from '@vueuse/core';
import scrollIntoView from 'scroll-into-view-if-needed';
import { computed, nextTick, ref } from 'vue';
import { BookAction } from '../action';

const props = defineProps<{ book: Book }>()

const { dialogRef, openDialog, closeDialog } = useDialog();

const listContianer = ref<HTMLUListElement | null>(null)
const inputRef = ref<HTMLInputElement | null>(null)

const allGrops = ref<Bookshelf[]>([])
const groupValue = ref<string>('')
const chooseGroup = ref<string>('')
const placeholderOption = computed(() => {
  const val = get(chooseGroup)
  if (!val) return []
  return allGrops.value.filter(item => item.name.includes(val))
})
const groupError = ref<string>('')
const activePlaceholder = ref(-1)
const [loading, setLoading] = useToggle(false)
const [submitLoading, setSubmitLoading] = useToggle(false)

const addAction = (val: Bookshelf) => {
  set(groupValue, BookshelfAction.toJSON(val))

  set(activePlaceholder, -1)
  set(chooseGroup, '')
}
const onPlaceholder = (val: Bookshelf) => addAction(val)

const activeToView = () => {
  const node = get(listContianer)
  if (!node) return
  const { scrollHeight, clientHeight } = node
  if (scrollHeight <= clientHeight) return // 无滚动条

  const target = node.children[get(activePlaceholder)]?.firstElementChild
  if (!target) return
  scrollIntoView(target, { behavior: 'smooth', scrollMode: 'if-needed' })
}

const onAdd = useThrottleFn(async () => {
  const index = get(activePlaceholder)
  if (index !== -1) {
    addAction(get(placeholderOption)[index])
    return
  }

  const val = get(chooseGroup).trim()
  if (val) {
    const all = get(allGrops)
    const isExist = all.find(item => item.name === val)
    if (!isExist) {
      const res = await BookshelfAction.add(val)
      if (res) {
        addAction(get(res))
      }
    } else {
      addAction(get(isExist))
    }
  }
}, 150)

const onDown = () => {
  const index = get(activePlaceholder)
  const len = get(placeholderOption).length
  if (index < len - 1) {
    set(activePlaceholder, index + 1)
    activeToView()
  }
}

const onUp = () => {
  const index = get(activePlaceholder)
  if (index <= 0) {
    set(activePlaceholder, 0)
  } else {
    set(activePlaceholder, index - 1)
  }
  activeToView()
}

const onTab = () => {
  const index = get(activePlaceholder)
  if (index !== -1) {
    addAction(get(placeholderOption)[index])
  }
}

const init = async () => {
  try {
    setLoading(true)
    const val = props.book.group
    set(groupValue, val)
    openDialog()
    await nextTick()
    openDialog()

    const res = await BookshelfAction.getAll()
    set(allGrops, res)

  } catch (err) {
    toastError(`t('book.getBookshelfFail'): ${err}`)
  } finally {
    setLoading(false)
    await nextTick()
    if (!props.book.group) {
      get(inputRef)?.focus()
    }
  }
}

const submit = async () => {
  try {
    if (get(submitLoading)) return

    setSubmitLoading(true)
    const group = get(groupValue)
    if (!group) {
      set(groupError, t('book.neeSelectBookshelf'))
      return
    }
    await BookAction.update(props.book.id, { group })
    toastSuccess(t('book.addToBookshelfSuccess'))
    closeDialog()
  } catch (err) {
    toastError(`${t('book.addToBookshelfFail')}: ${err}`)
  } finally {
    setSubmitLoading(false)
  }
}

init()
</script>

<template>
  <dialog class="modal" ref="dialogRef">
    <div class="modal-box max-w-5xl" v-on-click-outside="closeDialog" @contextmenu.prevent>
      <div class="flex flex-row justify-between items-center mb-5">
        <h3 class="font-bold text-lg">{{ t('book.addToBookshelf') }}</h3>
        <div @click="closeDialog"> <kbd class="kbd cursor-pointer">Esc</kbd></div>
      </div>
      <div class="flex flex-col gap-2 py-4" v-if="loading">
        <div class="skeleton h-12 w-full"></div>
        <div class="skeleton h-12 w-full"></div>
      </div>
      <form v-else>
        <div class="flex flex-col gap-2">
          <div class="min-h-12 px-4 rounded-lg bg-base-200 flex flex-row gap-2 items-center">
            <span>{{ t('book.name') }}</span>
            <div class="flex-1">{{ book.name }}</div>
          </div>
          <div class="mt-6">
            <label class="input input-bordered flex items-center gap-2" :class="{ 'input-error': groupError }">
              {{ t('book.bookshelf') }}
              <span class="badge badge-accent" v-if="groupValue">
                {{ BookshelfAction.toBookshelf(groupValue).name }}
              </span>
              <input type="text" class="grow" v-model="chooseGroup" :placeholder="t('book.needBookshelfName')"
                ref="inputRef" @keydown.enter="onAdd()" @keydown.prevent.down="onDown()" @keydown.prevent.up="onUp()"
                @keydown.prevent.tab="onTab()" />
            </label>

            <div class="label" v-if="groupError">
              <span class="label-text text-error">{{ groupError }}</span>
            </div>
            <ul v-if="placeholderOption.length" ref="listContianer"
              class="p-2 mt-2 z-[10] max-h-60 md:max-h-72 lg:max-h-96 w-full overflow-auto border border-accent  rounded-md menu flex-nowrap  bg-base-100 shadow-2xl  gap-1 scrollbar-thin">
              <li v-for="item, index in placeholderOption" :key="item.id" @click="onPlaceholder(item)"
                class="text-base-content">
                <a :class="{ active: activePlaceholder === index }">
                  {{ item.name }}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="modal-action">
          <button class="btn btn-outline" type="button" @click="closeDialog">{{ t('common.cancel') }}</button>
          <button class="btn btn-success ml-4" type="button" @click="submit">
            <span class="loading loading-spinner" v-if="submitLoading"></span>
            {{ t('common.sure') }}</button>
        </div>
      </form>
    </div>
  </dialog>
</template>