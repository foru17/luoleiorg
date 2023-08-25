<script setup lang="ts">
  import { computed, ref } from "vue";
  import { data } from "../posts.data.js";

  import Date from "./Date.vue";
  import { useData } from "vitepress";
  import ArticleCard from "./ArticleCard.vue";

  const posts = data.map((post) => {
    return {
      url: post.url,
      title: post.title,
      cover: post.cover,
      date: post.date,
    };
  });

  const isEmpty = posts.length === 0;
  const pageSize = 12;
  const pageTotal = Math.ceil(posts.length / pageSize);
  const pageNumber = ref(1);

  const hasNextPage = computed(() => {
    return pageNumber.value < pageTotal;
  });

  const hasPrevPage = computed(() => {
    return pageNumber.value > 1;
  });

  const articleList = computed(() => {
    const start = (pageNumber.value - 1) * pageSize;
    const end = pageNumber.value * pageSize;
    return posts.slice(start, end);
  });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // 使用平滑的滚动效果，如果不需要平滑滚动，可以删除此行
    });
  };

  const prevPage = () => {
    if (pageNumber.value > 1) {
      pageNumber.value--;
      scrollToTop();
    }
  };

  const nextPage = () => {
    if (pageNumber.value < pageTotal) {
      pageNumber.value++;
      scrollToTop();
    }
  };
</script>

<template>
  <div class="container px-4 md:px-0 max-w-7xl mx-auto -mt-4">
    <div
      class="w-full text-xl md:text-2xl text-gray-800 leading-normal rounded-t">
      <div class="flex flex-wrap justify-between pt-12 -mx-3 sd:mx-1 md:mx-0">
        <ArticleCard
          v-for="{ url, title, date, cover } of articleList"
          :key="url"
          :url="url"
          :title="title"
          :date="date"
          :cover="cover" />
      </div>
    </div>
    <div class="flex justify-center space-x-6 dark:text-gray-100 mt-6">
      <button
        @click="prevPage()"
        type="button"
        :disabled="!hasPrevPage"
        :class="{
          'cursor-not-allowed': !hasPrevPage,
          'bg-gray-100 dark:bg-gray-800  text-neutral-300': !hasPrevPage,
          'bg-white dark:bg-gray-900 hover:bg-neutral-100 hover:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:bg-neutral-100 focus:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(251,251,251,0.3)] dark:hover:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:focus:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:active:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)]':
            hasPrevPage,
        }"
        class="inline-block bg-white rounded-t px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-800 shadow-[0_4px_9px_-4px_#cbcbcb] transition duration-150 ease-in-out">
        {{ !hasPrevPage ? "第一页" : "上一页" }}
      </button>
      <p class="text-center font-medium md:text-sm mt-2.5 w-12">
        <a class="inline-block underline decoration-pink-500">{{
          pageNumber
        }}</a
        >/<a class="inline-block underline decoration-indigo-500">{{
          pageTotal
        }}</a>
      </p>
      <button
        type="button"
        :disabled="!hasNextPage"
        @click="nextPage()"
        :class="{
          'cursor-not-allowed': !hasNextPage,
          'bg-gray-100 dark:bg-gray-800  text-neutral-300': !hasNextPage,
          'bg-white dark:bg-gray-900 hover:bg-neutral-100 hover:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:bg-neutral-100 focus:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(251,251,251,0.3)] dark:hover:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:focus:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:active:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)]':
            hasNextPage,
        }"
        class="inline-block rounded-t px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-800 shadow-[0_4px_9px_-4px_#cbcbcb] transition duration-150 ease-in-out">
        {{ !hasNextPage ? "结束" : "下一页" }}
      </button>
    </div>
  </div>
</template>
