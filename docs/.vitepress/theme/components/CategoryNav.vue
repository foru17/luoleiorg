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

  return categoryMap
    .map((categoryDetail) => {
      return {
        name: categoryDetail.name,
        text: categoryDetail.text,
        count: categoryCounts[categoryDetail.text] || 0,
        isHome: categoryDetail.isHome,
      };
    })
    .filter((category) => category.isHome);
});

const isCategoryExist = computed(() => {
  return categoriesMeta.value.some((cat) => cat.text === currentCategory.value);
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
const goHot = () => {
  currentCategory.value = "hot";
  pageKey.value = 1;
  router.go(`${window.location.origin}${router.route.path}?category=hot`);
};

const goCategory = (category: string) => {
  currentCategory.value = category;
  pageKey.value = 1;
  const { searchParams } = new URL(window.location.href!);

  // 如果当前url的category与点击的category相同,则跳转回第一页
  searchParams.delete("category");
  searchParams.append("category", String(category));
  searchParams.delete("page");
  searchParams.append("page", "1");

  router.go(
    `${location.value.origin}${router.route.path}?${searchParams.toString()}`,
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
  { immediate: true },
);
</script>

<template>
  <div class="px=1 md:px-4 md:px-0 max-w-7xl mx-auto">
    <div h class="w-full px-4 mt-3 ld:h-40">
      <ClientOnly>
        <div class="flex items-center justify-between w-full">
          <!-- 遍历  {{ categoriesMeta }} ,展示 isHome 为 true 的分类 -->
          <div class="flex m-auto">
            <a
              @click="goHome()"
              :class="{
                'text-rose-400 dark:text-rose-400': !isCategoryExist,
                'text-black dark:text-slate-300': isCategoryExist,
              }"
              class="relative px-3 py-1 ml-0 mr-0 text-sm text-center home-nav-title hover:text-rose-400 rounded-xl md:text-base md:ml-1 md:mr-2"
            >
              最新<i class="hidden ml-3 md:inline-block text-slate-300">/</i>
            </a>

            <a
              v-for="(category, index) of categoriesMeta"
              :key="category.text"
              @click="goCategory(category.text)"
              class="inline-block px-3 py-1 ml-0 mr-0 text-sm text-center home-nav-title hover:text-rose-400 rounded-xl md:px-3 md:text-base md:ml-1 md:mr-2"
              :class="{
                'text-rose-400': category.text === currentCategory,
              }"
            >
              {{ category.name }}
              <i
                class="hidden ml-3 md:inline-block text-slate-300"
                :class="{ 'md:hidden': index === categoriesMeta.length - 1 }"
                >/</i
              >
            </a>
          </div>
        </div>
      </ClientOnly>
    </div>
  </div>
</template>
