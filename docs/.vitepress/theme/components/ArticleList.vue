<script setup lang="ts">
  import { computed, ref, watch, onMounted, nextTick, watchEffect } from "vue";
  import { useData, withBase, useRoute, useRouter } from "vitepress";
  import { useBrowserLocation } from "@vueuse/core";
  import { data } from "../posts.data.js";
  import { useCurrentCategory, useCurrentPageKey } from "../configProvider";
  import ArticleCard from "./ArticleCard.vue";

  const route = useRoute();
  const router = useRouter();

  const location = useBrowserLocation();

  // 获得当前页面的页码
  const pageKey = useCurrentPageKey();

  // 获得当前页面的分类
  const categoryKey = useCurrentCategory();

  const currentCategory = computed(() => categoryKey.value);

  const posts = data.map((post) => ({
    url: post.url,
    title: post.title,
    cover: post.cover,
    date: post.date,
    categories: post.categories || [],
  }));

  const pageSize = 12;

  const filteredPosts = computed(() => {
    const filtered = currentCategory.value
      ? posts.filter((post) => post.categories.includes(currentCategory.value))
      : posts;
    return filtered;
  });

  const pageTotal = computed(() =>
    Math.ceil(filteredPosts.value.length / pageSize)
  );

  const hasNextPage = computed(() => pageKey.value < pageTotal.value);
  const hasPrevPage = computed(() => pageKey.value > 1);

  const articleList = computed(() => {
    const start = (pageKey.value - 1) * pageSize;
    const end = pageKey.value * pageSize;
    return filteredPosts.value.slice(start, end);
  });

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const changePage = (page: number) => {
    const { searchParams } = new URL(window.location.href);
    console.log("[List] changePage", page);
    pageKey.value = page;
    searchParams.delete("page");
    searchParams.append("page", page);
    router.go(
      `${location.value.origin}${router.route.path}?${searchParams.toString()}`
    );
    scrollToTop();
  };

  const prevPage = () => {
    if (pageKey.value > 1) {
      changePage(pageKey.value - 1);
    }
  };

  const nextPage = () => {
    if (pageKey.value < pageTotal.value) {
      changePage(pageKey.value + 1);
    }
  };

  watch(
    location,
    () => {
      console.log("[List Watch] location", location.value);
      if (location.value.href) {
        const { searchParams } = new URL(location.value.href);
        if (searchParams.has("page")) {
          pageKey.value = Number(searchParams.get("page"));
        } else {
          pageKey.value = 1;
        }
      }

      console.log("[List Watch] categoryFilter", currentCategory.value);
      console.log("[List Watch] pageKey", pageKey.value);
    },
    { immediate: true }
  );
</script>

<template>
  <div class="container px-4 md:px-0 max-w-7xl mx-auto -mt-4">
    <div
      class="w-full text-xl md:text-2xl text-gray-800 leading-normal rounded-t">
      <ul class="flex flex-wrap justify-between pt-12 -mx-3 sd:mx-1 md:mx-0">
        <li
          class="w-full w-1/1 sd:w-1/3 md:w-1/4 px-4 py-3 sd:px-3 flex flex-col flex-grow flex-shrink h-100 md:h-100 ld:h-40"
          v-for="{ url, title, date, cover, categories } of articleList"
          :key="url">
          <ArticleCard
            :url="url"
            :title="title"
            :date="date"
            :cover="cover"
            :categories="categories" />
        </li>
      </ul>
    </div>
    <div class="flex justify-center space-x-6 dark:text-gray-100 mt-6">
      <button
        @click="prevPage()"
        type="button"
        :disabled="!hasPrevPage"
        :class="{
          'cursor-not-allowed': !hasPrevPage,
          'bg-gray-100 dark:bg-zinc-900  text-neutral-300': !hasPrevPage,
          'bg-white dark:bg-zinc-800 text-neutral-500 hover:bg-neutral-100  dark:hover:bg-zinc-800 ':
            hasPrevPage,
        }"
        class="inline-block bg-white dark:text-slate-300 shadow-md rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal transition duration-150 ease-in-out">
        {{ !hasPrevPage ? "第一页" : "上一页" }}
      </button>
      <p class="text-center font-medium md:text-sm mt-2.5 w-12">
        <a
          class="inline-block underline decoration-pink-500 text-neutral-500 dark:text-neutral-500"
          >{{ pageKey }}</a
        ><span class="text-neutral-900 dark:text-neutral-500">/</span
        ><a
          class="inline-block underline decoration-indigo-500 text-neutral-500 dark:text-neutral-500"
          >{{ pageTotal }}</a
        >
      </p>
      <button
        type="button"
        :disabled="!hasNextPage"
        @click="nextPage()"
        :class="{
          'cursor-not-allowed': !hasNextPage,
          'bg-gray-100 dark:bg-zinc-900  text-neutral-300': !hasNextPage,
          'bg-white dark:bg-zinc-800 text-neutral-500 hover:bg-neutral-100 dark:hover:bg-zinc-800 ':
            hasNextPage,
        }"
        class="inline-block bg-white rounded dark:text-slate-300 shadow-md px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-800 transition duration-150 ease-in-out">
        {{ !hasNextPage ? "结束" : "下一页" }}
      </button>
    </div>
  </div>
</template>
