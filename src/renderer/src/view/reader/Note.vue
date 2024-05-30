<script setup lang="ts">

</script>

<template>
  <div class="leftmenu-wrapper bg-base-100">笔记</div>
</template>

<style scoped>
.leftmenu-wrapper {
  --rightbar-width: 240px;
  width: var(--rightbar-width);
  transition: all .3s;
  position: sticky;
  bottom: 0;
  top: 0;
  height: 100vh;
  min-width: 15rem;
  border-inline-start-width: 1px;
  --tw-border-opacity: 1;
  border-color: var(--fallback-b2, oklch(var(--b2) / var(--tw-border-opacity)));
}

.leftmenu-wrapper.hide {
  margin-inline-end: calc(var(--rightbar-width)* -1);
}
</style>