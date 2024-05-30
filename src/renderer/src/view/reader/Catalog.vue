<script setup lang="ts">

</script>

<template>
  <div class="leftmenu-wrapper bg-base-100">目录</div>
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