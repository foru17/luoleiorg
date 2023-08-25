<script setup lang="ts">
  import { computed, ref, watch } from "vue";
  import { useData, withBase, useRoute } from "vitepress";
  import { data } from "../posts.data.js";
  import Date from "./Date.vue";
  import ArticleCard from "./ArticleCard.vue";

  const posts = data.map((post) => ({
    url: post.url,
    title: post.title,
    cover: post.cover,
    date: post.date,
    categories: post.categories || [],
  }));

  const isEmpty = posts.length === 0;
  const pageSize = 12;

  const getUrlPageNumber = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return Number(urlParams.get("page")) || 1;
  };

  const getUrlCategory = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("category") || null;
  };

  const pageNumber = ref(getUrlPageNumber());
  const categoryFilter = ref(getUrlCategory());

  const syncURLWithState = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("page", String(pageNumber.value));

    if (categoryFilter.value) {
      url.searchParams.set("category", categoryFilter.value);
    } else {
      url.searchParams.delete("category");
    }

    window.history.pushState({}, "", url.toString());
  };

  watch(categoryFilter, (newCategory) => {
    pageNumber.value = 1;
    syncURLWithState();
  });

  const route = useRoute();

  watch(
    route,
    (newRoute) => {
      // 当URL更改时，此函数会被调用
      categoryFilter.value = getUrlCategory();
      pageNumber.value = getUrlPageNumber();
    },
    { immediate: true }
  ); // immediate ensures the function runs immediately upon initialization

  const hasNextPage = computed(() => pageNumber.value < pageTotal.value);
  const hasPrevPage = computed(() => pageNumber.value > 1);

  const filteredPosts = computed(() => {
    return categoryFilter.value
      ? posts.filter((post) => post.categories.includes(categoryFilter.value))
      : posts;
  });

  const pageTotal = computed(() =>
    Math.ceil(filteredPosts.value.length / pageSize)
  );

  const articleList = computed(() => {
    const start = (pageNumber.value - 1) * pageSize;
    const end = pageNumber.value * pageSize;
    return filteredPosts.value.slice(start, end);
  });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const changePage = (page: number) => {
    pageNumber.value = page;
    syncURLWithState();
    scrollToTop();
  };

  const prevPage = () => {
    if (pageNumber.value > 1) {
      changePage(pageNumber.value - 1);
    }
  };

  const nextPage = () => {
    if (pageNumber.value < pageTotal.value) {
      changePage(pageNumber.value + 1);
    }
  };
</script>

<template>
  <div class="container px-4 md:px-0 max-w-7xl mx-auto -mt-4">
    <div
      class="w-full text-xl md:text-2xl text-gray-800 leading-normal rounded-t">
      <div class="flex flex-wrap justify-between pt-12 -mx-3 sd:mx-1 md:mx-0">
        <ArticleCard
          v-for="{ url, title, date, cover, categories } of articleList"
          :key="url"
          :url="url"
          :title="title"
          :date="date"
          :cover="cover"
          :categories="categories" />
      </div>
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
          >{{ pageNumber }}</a
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
