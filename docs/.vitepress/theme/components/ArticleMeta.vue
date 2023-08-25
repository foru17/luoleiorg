<script setup lang="ts">
  import { computed } from "vue";
  import { data as posts } from "../posts.data.js";
  import { useData, withBase, useRouter } from "vitepress";
  import { getBannerImage } from "../utils";

  const { frontmatter } = useData();
  const router = useRouter();
  const title = computed(() => frontmatter.value.title);
  const cover = computed(() => frontmatter.value.cover);
  const date = computed(() => frontmatter.value.date);
  const categories = computed(() => frontmatter.value.categories);
  const formatShowDate = computed(() => frontmatter.value.formatShowDate);
  const bannerImageUrl = computed(() => {
    return getBannerImage(frontmatter.value.cover);
  });

  const goCategory = (category: string) => {
    router.go(`?category=${category}`);
  };
</script>

<template>
  <div class="w-auto">
    <div
      class="h-64 rounded-md overflow-hidden bg-cover bg-center"
      :style="`
        background-image: url(${bannerImageUrl})`">
      <div class="bg-gray-900 bg-opacity-30 flex items-center h-full">
        <div class="px-10 max-w-xl">
          <h2
            class="text-3xl text-white break-normal font-bold line-clamp-4 sd: line-clamp-3 md: line-clamp-2">
            {{ title }}
          </h2>

          <!-- 如果categories 有值,则遍历渲染 -->
          <div v-if="categories" class="mt-2">
            <span
              v-for="(category, index) of categories"
              :key="index"
              @click="goCategory(category)"
              class="hidden inline-block border bg-transparent rounded-xl px-3 py-1 text-sm font-semibold text-white mr-2">
              {{ category }}
            </span>
          </div>
          <p class="inline-block mt-2 text-slate-200">发布时间: {{ date }}</p>
          <p class="mt-2 text-white"></p>
        </div>
      </div>
    </div>
  </div>
</template>
