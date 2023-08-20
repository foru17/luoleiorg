<script setup lang="ts">
  import { computed } from "vue";
  import { useData, withBase, useRoute } from "vitepress";
  import { data as posts } from "../posts.data.js";

  const { frontmatter: data } = useData();

  const route = useRoute();
  function findCurrentIndex() {
    return posts.findIndex((p) => p.url === route.path);
  }

  // use the customData date which contains pre-resolved date info
  const date = computed(() => posts[findCurrentIndex()].date);
  const nextPost = computed(() => posts[findCurrentIndex() + 1]);
  const prevPost = computed(() => posts[findCurrentIndex() - 1]);
</script>

<template>
  <!-- ...文章顶部代码... -->

  <div class="flex justify-center space-x-6 dark:text-gray-100 mt-6">
    <div
      v-if="prevPost"
      class="overflow-hidden w-full h-100 relative bg-zinc-100">
      <a
        :href="withBase(prevPost.url)"
        class="block h-full w-full flex items-center bg-cover bg-center hover:text-blue-600"
        :style="`
        background-image: url(${prevPost.cover})`">
        <div
          class="flex items-center overflow-hidden max-w-xl px-10 rounded-md bg-gray-900 bg-opacity-30 hover:bg-opacity-10 ease-in duration-300 w-full h-40 bg-zinc-100">
          <span
            class="a content-center break-normal text-xl text-neutral-100 line-clamp-2"
            >{{ prevPost.title }}</span
          >
        </div>
      </a>
    </div>

    <div
      v-if="nextPost"
      class="overflow-hidden w-full h-100 relative bg-zinc-100">
      <a
        :href="withBase(nextPost.url)"
        class="block h-full w-full flex items-center bg-cover bg-center hover:text-blue-600"
        :style="`
        background-image: url(${nextPost.cover})`">
        <div
          class="flex items-center overflow-hidden max-w-xl px-10 rounded-md bg-gray-900 bg-opacity-30 hover:bg-opacity-10 ease-in duration-300 w-full h-40 bg-zinc-100">
          <span
            class="a content-center break-normal text-xl text-neutral-100 line-clamp-2"
            >{{ nextPost.title }}</span
          >
        </div>
      </a>
    </div>
  </div>
</template>
