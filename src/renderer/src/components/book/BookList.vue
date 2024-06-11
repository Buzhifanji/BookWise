<script setup lang="ts">
import { Book } from '@renderer/batabase';
import { BookshelftMode } from '@renderer/enum';
import { useDialog, useRightClick } from '@renderer/hooks';
import { chuankArray, convertUint8ArrayToURL, remToPx } from '@renderer/shared';
import { settingStore, useContentCantianerStore } from '@renderer/store';
import { useVirtualizer } from '@tanstack/vue-virtual';
import { vOnClickOutside } from '@vueuse/components';
import { useToggle } from '@vueuse/core';
import { BellElectric, PencilLine, Trash2, UndoDot } from 'lucide-vue-next';
import { useForm } from 'vee-validate';
import { computed, defineProps, onMounted, ref, toRaw, withDefaults } from 'vue';
import { BookAction } from './action';


interface Props {
  data: Book[],
  isRecycleBin?: boolean,
}

const props = withDefaults(defineProps<Props>(), {
  data: () => [],
  isRecycleBin: false,
})


const emit = defineEmits<{
  (e: 'click', payload: Book): void;
}>();


const bookshelfWidht = 120
const bookshelfHeight = 137
const bookCardWidth = 282
const textOpacity = { '--tw-text-opacity': 0.6 };
const [bgOpacity, setBgOpacity] = useToggle(1)
const bookMode = (value: BookshelftMode) => value === settingStore.value.bookself

const store = useContentCantianerStore()

const parentRef = ref<HTMLElement | null>(null)

const parentOffsetRef = ref(0)

onMounted(() => {
  parentOffsetRef.value = parentRef.value?.offsetTop ?? 0
})

const list = computed(() => {
  const width = bookMode(BookshelftMode.bookshelf) ? bookshelfWidht : bookMode(BookshelftMode.card) ? bookCardWidth : 0
  const count = parseInt(((store.width) / (width + remToPx(2.5))).toString())
  return bookMode(BookshelftMode.list) ? toRaw(props.data) : chuankArray(toRaw(props.data) || [], count)
})

// 虚拟列表
const rowVirtualizerOptions = computed(() => {
  return {
    count: list.value.length,
    estimateSize: () => 350,
    overscan: 5,
    getScrollElement: () => parentRef.value,
  }
})

const rowVirtualizer = useVirtualizer(rowVirtualizerOptions)

const virtualRows = computed(() => rowVirtualizer.value.getVirtualItems())

const totalSize = computed(() => rowVirtualizer.value.getTotalSize())

const measureElement = (el) => {
  if (!el) {
    return
  }

  rowVirtualizer.value.measureElement(el)

  return undefined
}

// 右键
const { rightEvent, closeRight, rightInfo, selectData } = useRightClick<Book>()

// 消息确认弹出
const { dialogRef, openDialog, closeDialog } = useDialog();

// 编辑
const { dialogRef: editeDialogRef, openDialog: openEditeDiaglog, closeDialog: closeEditeDialog } = useDialog();
type editeData = { name: string, author: string }
const { defineField, handleSubmit, errors: editeError } = useForm<editeData>({
  validationSchema: {
    name: (value: unknown) => value ? true : '请输入书名',
    author: (value: unknown) => value ? true : '请输入作者名',
  },
});
const [name, nameProps] = defineField('name')
const [author, authorProps] = defineField('author')
const onEdite = () => {
  if (!selectData.value) return
  name.value = selectData.value.name
  author.value = selectData.value.author
  openEditeDiaglog()
}
const submitEdite = handleSubmit(values => {
  BookAction.editeOne(selectData.value!.id, values)
  closeEditeDialog()
});

// 详情
const { dialogRef: detailDialogRef, openDialog: openDetailDiaglog, closeDialog: closeDetailDialog } = useDialog();


// 删除
let _isForce = false;
function removeBefore(isForce: boolean) {
  const id = selectData.value?.id
  if (!id) return
  _isForce = isForce;
  openDialog()
  closeRight()
}
function removeOneBook() {
  const id = selectData.value?.id
  if (!id) return

  if (!_isForce) {
    _isForce = settingStore.value.isOpenRecyleBin
  }

  BookAction.removeOne(id, _isForce)

  closeDialog()
}

// 恢复
function restoreOneBook() {
  const id = selectData.value?.id
  if (!id) return

  BookAction.restoreOne(id)

  closeRight()
}


</script>

<template>
  <div ref="parentRef" class="p-6 flex h-full overflow-auto">
    <div class="relative w-full" :style="{
      height: `${totalSize}px`,
    }">
      <template v-for="virtualRow in virtualRows" :key="virtualRow.key">
        <div :ref="measureElement" :data-index="virtualRow.index" class="absolute top-0 left-0  w-full "
          :class="[bookMode(BookshelftMode.list) ? 'pb-5' : 'pb-10']" :style="{
      transform: `translateY(${virtualRow.start - rowVirtualizer.options.scrollMargin
        }px)`,
    }">
          <div class="relative w-full" v-if="bookMode(BookshelftMode.bookshelf)">
            <!-- 书架模式 -->
            <div class="flex w-full justify-start pb-[1.125rem] px-5 gap-10 class ">
              <template v-for="item in list[virtualRow.index] as Book[]">
                <div class="card bg-base-100  rounded shadow cursor-pointer gap-2 bookshelf transition ease-in-out"
                  @click="emit('click', item)"
                  :style="{ width: `${bookshelfWidht}px`, height: `${bookshelfHeight + remToPx(3.5)}px` }"
                  @contextmenu="rightEvent($event, item)">
                  <div :style="{ width: `${bookshelfWidht}px`, height: `${bookshelfHeight}px` }" class="rounded">
                    <img :src="convertUint8ArrayToURL(item.cover)" class="w-full rounded h-full object-cover"
                      alt="书籍封面">
                  </div>
                  <div class="line-clamp-2 mx-1 mb-1 text-sm">{{ item.name }}</div>
                </div>
              </template>
            </div>
            <div class="shelf-shadows shadow-2xl"></div>
            <div class="shelf bg-base-100"></div>
          </div>
          <div v-else-if="bookMode(BookshelftMode.card)" class="flex w-full justify-start  gap-10">
            <!-- 卡片模式 -->
            <template v-for="item in list[virtualRow.index] as Book[]">
              <div
                class="card flex-row items-center gap-4 p-4 bg-base-100 shadow-md cursor-pointer transition ease-in-out duration-150  hover:scale-110"
                @click="emit('click', item)" @contextmenu="rightEvent($event, item)"
                :style="{ width: `${bookCardWidth}px` }">
                <figure :style="{ width: `${84}px`, height: `${121}px` }"><img :src="convertUint8ArrayToURL(item.cover)"
                    class="w-full rounded h-full object-cover" alt="书籍封面">
                </figure>
                <div class="flex flex-1 flex-col gap-2">
                  <p class="line-clamp-2">{{ item.name }}</p>
                  <p class="line-clamp-2 label-text" :style="textOpacity"> {{ item.author }}.</p>
                </div>
              </div>
            </template>
          </div>
          <div v-else class="flex w-full flex-col ">
            <!-- 列表模式 -->
            <div
              class="card flex flex-row bg-base-100 p-2 gap-4 cursor-pointer shadow hover:bg-primary hover:text-primary-content"
              :style="{ '--tw-bg-opacity': bgOpacity }" @mouseenter="setBgOpacity(0.6)" @mouseleave="setBgOpacity(1)"
              @click="emit('click', list[virtualRow.index] as Book)"
              @contextmenu="rightEvent($event, list[virtualRow.index] as Book)">
              <figure :style="{ width: `${84}px`, height: `${121}px` }"><img
                  :src="convertUint8ArrayToURL((list[virtualRow.index] as Book).cover)"
                  class="w-full rounded h-full object-cover" alt="书籍封面">
              </figure>
              <div class="flexflex-col flex-1 py-2">
                <p class="line-clamp-1">{{ (list[virtualRow.index] as Book).name }}</p>
                <p class="line-clamp-1 label-text" :style="textOpacity">{{ (list[virtualRow.index] as Book).author }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>

    <!-- 右键 -->
    <ul class="fixed menu bg-base-100 rounded-md shadow-2xl gap-1 w-40 z-[99]" v-on-click-outside="closeRight"
      v-if="rightInfo.show" :style="{ top: rightInfo.top, left: rightInfo.left }">
      <template v-if="isRecycleBin">
        <li @click="restoreOneBook()">
          <a>
            <UndoDot class="h-5 w-5" />恢复
          </a>
        </li>
        <li @click="removeBefore(true)">
          <a class="text-error">
            <Trash2 class="h-5 w-5" />永久删除
          </a>
        </li>
      </template>
      <template v-else>
        <li @click="removeBefore(false)">
          <a class="text-error">
            <Trash2 class="h-5 w-5" />删除
          </a>
        </li>
        <li @click="onEdite()">
          <a>
            <PencilLine class="h-5 w-5" />编辑
          </a>
        </li>
        <li @click="openDetailDiaglog()">
          <a>
            <BellElectric class="h-5 w-5" />详情
          </a>
        </li>
      </template>
    </ul>

    <!-- 确认消息 -->
    <dialog class="modal" ref="dialogRef">
      <div class="modal-box" v-on-click-outside="closeDialog">
        <h3 class="font-bold text-lg">删除书籍</h3>
        <p class="py-4">{{ selectData?.name }}</p>
        <p v-if="settingStore.isOpenRecyleBin && !isRecycleBin" class="text-warning">将本书移入回收站</p>
        <p v-else class="text-warning">将本书永久删除</p>
        <div class="modal-action">
          <button class="btn btn-outline" @click="closeDialog">取消</button>
          <button class="btn btn-outline  btn-error ml-4" @click="removeOneBook">确认</button>
        </div>
      </div>
    </dialog>

    <!-- 编辑 -->
    <dialog class="modal" ref="editeDialogRef">
      <div class="modal-box" v-on-click-outside="closeEditeDialog">
        <h3 class="font-bold text-lg mb-5">编辑书籍</h3>
        <form @submit="submitEdite">
          <div class="flex flex-col gap-4">
            <div>
              <label class="input input-bordered flex items-center gap-2" for="name"
                :class="{ 'input-error': editeError.name }">
                书名
                <input type="text" class="grow" name="name" v-model="name" v-bind="nameProps" placeholder="请输入书名" />
              </label>
              <div class="label" v-if="editeError.name">
                <span class="label-text text-error">{{ editeError.name }}</span>
              </div>
            </div>
            <div>
              <label class="input input-bordered flex items-center gap-2" :class="{ 'input-error': editeError.author }">
                作者
                <input type="text" class="grow" name="author" v-model="author" v-bind="authorProps"
                  placeholder="请输入作者名" />
              </label>
              <div class="label" v-if="editeError.author">
                <span class="label-text text-error">{{ editeError.author }}</span>
              </div>
            </div>
          </div>
          <div class="modal-action">
            <button class="btn btn-outline" @click="closeEditeDialog">取消</button>
            <button class="btn btn-success ml-4" type="submit">确认</button>
          </div>
        </form>
      </div>
    </dialog>

    <!-- 详情 -->
    <dialog class="modal" ref="detailDialogRef">
      <div class="modal-box max-w-5xl" v-on-click-outside="closeDetailDialog">
        <h3 class="font-bold text-lg mb-5">书籍详情</h3>
        <div class="columns-1 md:columns-2 gap-x-8 gap-y-6 ">
          <div class="flex gap-4 mb-3">
            <div>书名</div>
            <div class="stat-title">{{ selectData?.name }}</div>
          </div>
          <div class="flex gap-4 mb-3">
            <div>作者</div>
            <div class="stat-title">{{ selectData?.author }}</div>
          </div>
          <div class="flex gap-4 mb-3">
            <div>大小</div>
            <div class="stat-title">{{ selectData?.size }}</div>
          </div>
          <div class="flex gap-4 mb-3">
            <div>页数</div>
            <div class="stat-title">{{ selectData?.pages }}</div>
          </div>
          <div class="flex gap-4 mb-3">
            <div>出版商</div>
            <div class="stat-title">{{ selectData?.publisher }}</div>
          </div>
          <div class="flex gap-4 mb-3">
            <div>出版时间</div>
            <div class="stat-title">{{ selectData?.publishTime }}</div>
          </div>
          <div class="flex gap-4 mb-3">
            <div>创建时间</div>
            <div class="stat-title">{{ selectData?.createTime }}</div>
          </div>
          <div class="flex gap-4 mb-3">
            <div>更新时间</div>
            <div class="stat-title">{{ selectData?.updateTime }}</div>
          </div>
        </div>
        <div class="modal-action">
          <button class="btn btn-outline" @click="closeDetailDialog">关闭</button>
        </div>
      </div>
    </dialog>
  </div>
</template>

<style scoped>
.bookshelf {
  transform: perspective(2000px) rotateY(0deg) translateX(0px) scaleX(1);
  transform-style: preserve-3d;
  box-shadow: 6px 6px 12px -1px rgba(0, 0, 0, 0.1), 20px 14px 16px -6px rgba(0, 0, 0, 0.1);
}

.bookshelf:hover {
  transform: perspective(2000px) rotateY(-15deg) translateX(-10px) scaleX(0.94);
}

.shelf-shadows {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1rem;
  border-radius: 2px;
  z-index: 1;
}

.shelf {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1rem;
  border-radius: 2px;
  z-index: 3;
  box-shadow:
    0px -5px 3px 0px rgba(0, 0, 0, 0.2),
    0px 15px 20px 0px rgba(0, 0, 0, 0.6),
    0px 15px 20px 0px rgba(0, 0, 0, 0.6),
    0px 15px 20px 0px rgba(0, 0, 0, 0.6),
    0px 5px 5px 0px rgba(0, 0, 0, 0.3),
    0px 5px 5px 0px rgba(0, 0, 0, 0.3),
    0px 5px 5px 0px rgba(0, 0, 0, 0.3);
}
</style>./action