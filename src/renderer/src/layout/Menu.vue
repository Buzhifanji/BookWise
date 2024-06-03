<script setup lang="ts">
import { RouterName } from '@renderer/route';
import { Book, PencilLine, Settings, Trash2 } from 'lucide-vue-next';
import { ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const menus = [
  { name: 'menu.book', path: RouterName.Book, icon: Book },
  { name: 'menu.note', path: RouterName.Note, icon: PencilLine },
  { name: 'menu.recycleBin', path: RouterName.RecycleBin, icon: Trash2 },
  { name: 'menu.setting', path: RouterName.Setting, icon: Settings },
]

const activeIndex = ref<number>(-1)

watchEffect(() => {
  const path = router.currentRoute.value.path
  let has = false;
  menus.forEach((item, index) => {
    if (path === `/${item.path}`) {
      activeIndex.value = index
      has = true
    }
  })
  if (!has) {
    activeIndex.value = -1
  }
})

</script>

<template>
  <div class="leftmenu-wrapper bg-base-100">
    <a href="/" class="flex h-16 items-center justify-center">BookWise</a>
    <div data-simplebar="init" class="h-[calc(100vh-64px)] lg:h-[calc(100vh-230px)]">
      <ul class="menu mb-6">
        <li class="mb-0.5" v-for="(item, index) in menus">
          <RouterLink :to="item.path" class="hover:bg-base-content/15" :class="{ 'active': index === activeIndex }">
            <div class="flex items-center gap-2">
              <component :is="item.icon" class="w-4 h-4" />
              {{ $t(item.name) }}
            </div>
          </RouterLink>
        </li>
      </ul>
    </div>
    <div class="mx-4 hidden rounded bg-base-200 px-3 py-4 lg:block">
      自家推荐
    </div>
  </div>
</template>

<style scoped>
.leftmenu-wrapper {
  width: var(--leftbar-width);
  transition: all .3s;
  position: sticky;
  bottom: 0;
  top: 0;
  height: 100vh;
  min-width: 15rem;
  border-inline-end-width: 1px;
  --tw-border-opacity: 1;
  border-color: var(--fallback-b2, oklch(var(--b2) / var(--tw-border-opacity)));
}

.leftmenu-wrapper.hide {
  margin-inline-start: calc(var(--leftbar-width)* -1);
}
</style>