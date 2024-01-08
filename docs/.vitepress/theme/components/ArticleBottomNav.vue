<script setup lang="ts">
  import { computed } from "vue";
  import { useData, withBase, useRoute } from "vitepress";
  import { data as posts } from "../posts.data.js";
  import { getPreviewImage } from "../utils";
  const { frontmatter: data } = useData();

  const route = useRoute();
  function findCurrentIndex() {
    return posts.findIndex((p) => p.url === route.path);
  }

  // use the customData date which contains pre-resolved date info
  const date = computed(() => posts[findCurrentIndex()].date);
  const nextPost = computed(() => posts[findCurrentIndex() + 1]);
  const prevPost = computed(() => posts[findCurrentIndex() - 1]);

  // 分别获得上一篇和下一篇文章的 getPreviewImage 后的图片地址
  const nextPostPreviewImageUrl = computed(() => {
    if (!nextPost.value.cover) {
      return "";
    }
    return getPreviewImage(nextPost.value.cover);
  });

  const prevPostPreviewImageUrl = computed(() => {
    if (!prevPost.value.cover) {
      return "";
    }
    return getPreviewImage(prevPost.value.cover);
  });
</script>

<template>
  <!-- ...文章顶部代码... -->

  <div class="flex justify-center mt-6 space-x-6 dark:text-gray-100">
    <div
      v-if="prevPost"
      class="relative w-full overflow-hidden rounded-md h-100 bg-zinc-100">
      <a
        :href="withBase(prevPost.url)"
        class="flex items-center w-full h-full bg-center bg-cover hover:text-blue-600"
        :style="`
        background-image: url(${prevPostPreviewImageUrl})`">
        <div
          class="flex items-center w-full h-40 max-w-xl px-2 duration-300 ease-in bg-gray-900 rounded-md md:px-10 bg-opacity-30 hover:bg-opacity-10">
          <span
            class="content-center break-normal a text-s sd:text-large md:text-lg text-neutral-100 line-clamp-3 md:line-clamp-2"
            >{{ prevPost.title }}</span
          >
        </div>
      </a>
    </div>

    <div
      v-if="nextPost"
      class="relative w-full overflow-hidden rounded-md h-100 bg-zinc-100">
      <a
        :href="withBase(nextPost.url)"
        class="flex items-center w-full h-full bg-center bg-cover hover:text-blue-600"
        :style="`
        background-image: url(${nextPostPreviewImageUrl})`">
        <div
          class="flex items-center w-full h-40 px-2 duration-300 ease-in bg-gray-900 rounded-md max-w-7xl md:px-10 bg-opacity-30 hover:bg-opacity-10">
          <span
            class="content-center break-normal a text-s sd:text-large md:text-lg text-neutral-100 line-clamp-3 md:line-clamp-2"
            >{{ nextPost.title }}</span
          >
        </div>
      </a>
    </div>
  </div>
</template>
