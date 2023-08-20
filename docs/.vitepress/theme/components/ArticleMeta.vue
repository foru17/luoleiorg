<script setup lang="ts">
  import { computed } from "vue";
  import { data as posts } from "../posts.data.js";
  import { useData, withBase } from "vitepress";

  const { frontmatter } = useData();

  const title = computed(() => frontmatter.value.title);
  const cover = computed(() => frontmatter.value.cover);
  const date = computed(() => frontmatter.value.date);
  const formatShowDate = computed(() => frontmatter.value.formatShowDate);
</script>

<template>
  <div class="w-auto">
    <div
      class="h-64 rounded-md overflow-hidden bg-cover bg-center"
      :style="`
        background-image: url(${cover})`">
      <div class="bg-gray-900 bg-opacity-30 flex items-center h-full">
        <div class="px-10 max-w-xl">
          <h2 class="text-3xl text-white break-normal font-bold">
            {{ title }}
          </h2>
          <p class="inline-block mt-2 text-slate-200">发布时间: {{ date }}</p>
          <p class="mt-2 text-white"></p>
        </div>
      </div>
    </div>
  </div>
</template>
