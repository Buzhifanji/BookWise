<script setup lang="ts">
import { Select } from '@renderer/headlessui'
</script>

<template>
  <div class="p-6 grid grid-cols-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <div class="col-span-full">
    <h2 class="font-bold text-lg ">
      用户设置
      </h2>
    </div>
    <div class="col-span-full lg:col-auto">
      <div class="card w-96 bg-base-100 shadow">
        <div class="card-body">
          <h2 class="card-title">语言 & 主题</h2>
          <label class="form-control w-full max-w-xs">
            <div class="label">
              <span class="label-text">选择语言</span>
            </div>
            <select class="select select-bordered">
              <option disabled selected>Pick one</option>
              <option>Star Wars</option>
              <option>Harry Potter</option>
              <option>Lord of the Rings</option>
              <option>Planet of the Apes</option>
              <option>Star Trek</option>
            </select>
          </label>
          <label class="form-control w-full max-w-xs">
            <div class="label">
              <span class="label-text">选择主题</span>
            </div>
            <select class="select select-bordered">
              <option disabled selected>Pick one</option>
              <option>Star Wars</option>
              <option>Harry Potter</option>
              <option>Lord of the Rings</option>
              <option>Planet of the Apes</option>
              <option>Star Trek</option>
            </select>
          </label>
          <div>

          <Select />
        </div>

        </div>
      </div>
    </div>
  </div>
</template>