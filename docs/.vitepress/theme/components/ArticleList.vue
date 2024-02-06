<script setup lang="ts">
  import { computed, ref, watch, onMounted, nextTick, watchEffect } from "vue";
  import { useData, withBase, useRoute, useRouter } from "vitepress";
  import { useBrowserLocation } from "@vueuse/core";
  import { data } from "../posts.data.js";
  import { useCurrentCategoryKey, useCurrentPageKey } from "../configProvider";
  import ArticleCard from "./ArticleCard.vue";

  const route = useRoute();
  const router = useRouter();

  const location = useBrowserLocation();

  // 获得当前页面的分类
  const categoryKey = useCurrentCategoryKey();

  const isArticleListHitsFetched = ref<boolean>(false);

  const currentCategory = computed(() => categoryKey.value);
  const pageSize = 12;

  const posts = ref(
    data.map((post) => ({
      url: post.url,
      title: post.title,
      cover: post.cover,
      date: post.date,
      categories: post.categories || [],
      hit: 0, // 添加 hit 字段并初始化为 0
    }))
  );

  const filteredPosts = computed(() => {
    if (currentCategory.value === "hot" && isArticleListHitsFetched.value) {
      return sortPostsByHit(posts.value);
    } else {
      return currentCategory.value
        ? posts.value.filter((post) =>
            post.categories.includes(currentCategory.value)
          )
        : posts.value;
    }
  });

  const pageTotal = computed(() =>
    Math.ceil(filteredPosts.value.length / pageSize)
  );

  // 获得当前页面的页码
  const pageKey = useCurrentPageKey();
  const articleList = computed(() => {
    const start = (pageKey.value - 1) * pageSize;
    const end = start + pageSize;
    return filteredPosts.value.slice(start, end);
  });

  const hasNextPage = computed(() => pageKey.value < pageTotal.value);
  const hasPrevPage = computed(() => pageKey.value > 1);

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const sortPostsByHit = (posts) => {
    return posts.filter((post) => post.hit > 0).sort((a, b) => b.hit - a.hit); // 根据 hit 字段大小从大到小排列
  };

  const changePage = (page: number) => {
    const { searchParams } = new URL(window.location.href);
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

  const fetchArticleListHits = async () => {
    try {
      const response = await fetch(`https://st.luolei.org/ga`);
      const { data } = await response.json();
      data.forEach((item) => {
        const post = posts.value.find((p) => p.url === item.page);
        if (post) {
          post.hit = item.hit;
        }
      });
      // 设置 isArticleListHitsFetched 为 true
      isArticleListHitsFetched.value = true;
    } catch (error) {
      console.error("Error fetching page hits:", error);
    }
  };

  watch(
    location,
    () => {
      if (location.value.href) {
        const { searchParams } = new URL(location.value.href);
        if (searchParams.has("page")) {
          pageKey.value = Number(searchParams.get("page"));
        } else {
          pageKey.value = 1;
        }
      }
    },
    { immediate: true }
  );

  onMounted(() => {
    fetchArticleListHits();
  });
</script>

<template>
  <div class="px-4 mx-auto -mt-4 md:px-0 max-w-7xl">
    <div
      class="w-full text-xl leading-normal text-gray-800 rounded-t md:text-2xl">
      <ul
        class="flex flex-wrap justify-between pt-6 -mx-3 md:pt-12 sd:mx-1 md:mx-0">
        <li
          class="flex flex-col flex-grow flex-shrink w-full px-4 py-3 w-1/1 sd:w-1/3 md:w-1/4 sd:px-3 h-100 md:h-100 ld:h-40"
          v-for="{ url, title, date, cover, categories, hit } of articleList"
          :key="url">
          <ArticleCard
            :url="url"
            :title="title"
            :date="date"
            :cover="cover"
            :categories="categories"
            :hit="hit"
            :isArticleListHitsFetched="isArticleListHitsFetched" />
        </li>
      </ul>
    </div>
    <div class="flex justify-center mt-6 space-x-6 dark:text-gray-100">
      <ClientOnly>
      <button
        @click="prevPage()"
        type="button"
        :class="
          hasPrevPage
            ? 'bg-white dark:bg-zinc-800 text-neutral-500 hover:bg-neutral-100 dark:hover:bg-zinc-800'
            : 'bg-gray-100 dark:bg-zinc-900 text-neutral-300'
        "
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
      </ClientOnly>
    </div>
  </div>
</template>
