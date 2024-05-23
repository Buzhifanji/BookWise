<script setup lang="ts">

</script>

<template>
  <div class="leftmenu-wrapper bg-base-100">
    <a href="/" class="flex h-16 items-center justify-center">BookWise</a>
    <div data-simplebar="init" class="h-[calc(100vh-64px)] lg:h-[calc(100vh-230px)]">
      <ul class="menu mb-6">
        <li class="mb-0.5">
          <a href="/" class="hover:bg-base-content/15">
            <div class="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true"
                role="img" font-size="18" width="1em" height="1em" viewBox="0 0 24 24">
                <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                  <path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1"></path>
                  <path d="m12 15l5 6H7l5-6z"></path>
                </g>
              </svg>
              Dashboard
            </div>
          </a>
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