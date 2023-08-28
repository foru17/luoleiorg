<script setup lang="ts">
  import { computed, ref, watch, onMounted, watchEffect, nextTick } from "vue";
  import { useData, withBase, useRoute, useRouter } from "vitepress";
  import { useBrowserLocation } from "@vueuse/core";
  import { data } from "../posts.data.js";
  import { useCurrentCategoryKey, useCurrentPageKey } from "../configProvider";
  import { categoryMap } from "../constant"; // 导入分类映射

  const route = useRoute();
  const router = useRouter();
  const location = useBrowserLocation();

  const pageKey = useCurrentPageKey();
  const currentCategory = useCurrentCategoryKey();

  const categoriesMeta = computed(() => {
    const categoryCounts: Record<string, number> = {};

    for (const post of data) {
      for (const category of post.categories || []) {
        if (!categoryCounts[category]) {
          categoryCounts[category] = 0;
        }
        categoryCounts[category]++;
      }
    }

    const allCategories = [
      ...new Set(data.flatMap((post) => post.categories || [])),
    ];

    return allCategories
      .map((categoryText) => {
        const detail = getCategoryDetail(categoryText);
        return {
          name: detail.name,
          text: detail.text,
          count: categoryCounts[categoryText] || 0,
          isHome: detail.isHome,
        };
      })
      .filter((category) => category.isHome); // 只保留 isHome 为 true 的分类
  });

  const isCategoryExist = computed(() => {
    return categoriesMeta.value.some(
      (cat) => cat.text === currentCategory.value
    );
  });

  function getCategoryDetail(text: string) {
    const category = categoryMap.find((cat) => cat.text === text);
    if (category) {
      return category;
    } else {
      return {
        text,
        name: text,
        isHome: false,
      };
    }
  }

  const goHome = () => {
    currentCategory.value = null;
    pageKey.value = 1;
    router.go(`${window.location.origin}${router.route.path}`);
  };

  const goCategory = (category: string) => {
    currentCategory.value = category;
    pageKey.value = 1;
    const { searchParams } = new URL(window.location.href!);
    searchParams.delete("category");
    searchParams.append("category", String(category));
    router.go(
      `${location.value.origin}${router.route.path}?${searchParams.toString()}`
    );
  };

  watch(
    location,
    () => {
      if (location.value.href) {
        const { searchParams } = new URL(location.value.href);
        if (searchParams.has("category")) {
          currentCategory.value = searchParams.get("category") || null;
        }
      }
    },
    { immediate: true }
  );
</script>

<template>
  <div class="container px-4 md:px-0 max-w-7xl mx-auto">
    <div h class="w-full ld:h-40 px-4 mt-3">
      <div class="w-full flex items-center justify-between">
        <!-- 遍历  {{ categoriesMeta }} ,展示 isHome 为 true 的分类 -->
        <div class="flex m-auto">
          <a
            @click="goHome()"
            :class="{
              'text-rose-400 dark:text-rose-400': !isCategoryExist,
              'text-black dark:text-slate-300': isCategoryExist,
            }"
            class="home-nav-title relative text-center hover:text-rose-400 rounded-xl px-3 py-1 text-sm md:text-base mr-2">
            最新<i class="hidden md:inline-block text-slate-300 ml-3">/</i>
          </a>

          <a
            v-for="(category, index) of categoriesMeta"
            :key="category.text"
            @click="goCategory(category.text)"
            class="home-nav-title inline-block text-center ml-1 hover:text-rose-400 rounded-xl px-3 md:px-3 py-1 text-sm md:text-base mr-2"
            :class="{
              'text-rose-400': category.text === currentCategory,
            }">
            {{ category.name }}
            <i
              class="hidden md:inline-block text-slate-300 ml-3"
              :class="{ 'md:hidden': index === categoriesMeta.length - 1 }"
              >/</i
            >
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
