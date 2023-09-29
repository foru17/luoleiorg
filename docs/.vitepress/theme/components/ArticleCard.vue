<script setup lang="ts">
  import { data as posts } from "../posts.data.js";
  import { useData, withBase, useRouter } from "vitepress";
  const { frontmatter } = useData();
  import { watch, nextTick, ref, onMounted, computed } from "vue";
  import { getPreviewImage } from "../utils";
  const props = defineProps<{
    url: string;
    title: string;
    cover: string;
    date: Object;
    categories: string[];
    hit: number;
    isArticleListHitsFetched: boolean;
  }>();

  const hotArticleViews = 5000;
  const router = useRouter();
  let timeoutHandle = null;
  const imgRef = ref<HTMLImageElement | null>(null);

  const imageLoaded = ref(false);
  const imageError = ref(false);

  const onImageLoad = () => {
    imageError.value = false;
    imageLoaded.value = true;
  };

  const onImageError = () => {
    imageError.value = true;
    imageLoaded.value = true; // 也设置图片为已加载，隐藏加载动画
  };

  const previewImageUrl = computed(() => {
    if (!props.cover) {
      console.error("Cover image URL is not provided!");
      return "";
    }
    return getPreviewImage(props.cover);
  });

  const retryLoadImage = () => {
    // 清除旧的超时句柄
    clearTimeout(timeoutHandle);
    // 设置超时逻辑
    timeoutHandle = setTimeout(() => {
      if (!imageLoaded.value) {
        onImageError();
      }
    }, 15000);
  };

  const goCategory = (category: string) => {
    router.go(`?category=${category}`);
  };

  onMounted(() => {
    // 当组件被挂载后
    nextTick(() => {
      if (imgRef.value?.complete) {
        imageLoaded.value = true;
      }
      retryLoadImage();
    });
  });
</script>

<template>
  <div
    class="flex-1 bg-white dark:bg-zinc-800 rounded-t overflow-hidden h-64 shadow-lg ease-in-out hover:shadow-2xl duration-300">
    <a
      :href="withBase(url)"
      class="flex flex-wrap no-underline hover:no-underline">
      <div
        class="overflow-hidden w-full h-60 md:h-40 ld:h-40 relative bg-zinc-100 dark:bg-neutral-900">
        <img
          ref="imgRef"
          :src="previewImageUrl"
          @load="onImageLoad"
          @error="onImageError"
          :class="{
            'opacity-0': !imageLoaded,
            'opacity-100': imageLoaded && !imageError,
            'opacity-0 delay-0': imageLoaded && imageError,
          }"
          class="absolute top-0 left-0 h-full w-full object-cover rounded-t hover:scale-105 ease-in duration-300" />
        <div
          v-if="!imageLoaded || imageError"
          :class="{ 'animate-pulse': !imageLoaded }"
          class="flex space-x-4 mt-6 p-2">
          <span v-if="!imageError" class="relative flex h-10 w-10">
            <span
              class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-100 opacity-75"></span>
            <span
              class="relative inline-flex rounded-full h-10 w-10 bg-slate-200 dark:bg-slate-600"></span>
          </span>

          <div
            v-if="imageError"
            class="md:block w-0 h-0 mt-1 border-l-[20px] border-l-transparent border-t-[30px] border-t-slate-200 dark:border-t-slate-600 border-r-[20px] border-r-transparent"></div>
          <div class="flex-1 space-y-6 py-1">
            <div
              class="h-8 md:h-4 bg-slate-200 dark:bg-slate-600 rounded"></div>
            <div class="space-y-3">
              <div class="grid grid-cols-3 gap-4">
                <div
                  class="h-8 md:h-4 bg-slate-200 dark:bg-slate-600 rounded col-span-2"></div>
                <div
                  class="h-8 md:h-4 bg-slate-200 dark:bg-slate-600 rounded col-span-1"></div>
              </div>
              <div
                class="h-8 md:h-4 bg-slate-200 dark:bg-slate-600 rounded"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full px-6 mt-5">
        <p
          class="h-auto md:h-12 font-medium antialiased break-normal text-base sd:text-lg md:text-base text-gray-800 dark:text-slate-300 line-clamp-2">
          {{ title }}
        </p>
      </div>
    </a>
  </div>
  <div
    class="flex-none mt-auto bg-white dark:bg-zinc-800 rounded-b rounded-t-none overflow-hidden shadow-lg px-6 py-3 h-12">
    <div class="flex items-center justify-between">
      <p
        class="text-gray-400 dark:text-slate-400 text-sm sd:text-sm md:text-sm">
        {{ date.formatShowDate }}
      </p>

      <div class="flex justify-items-end items-center">
        <svg
          v-if="!isArticleListHitsFetched"
          aria-hidden="true"
          class="w-3 h-3 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor" />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill" />
        </svg>

        <svg
          v-if="isArticleListHitsFetched && hit <= hotArticleViews"
          class="icon text-gray-400 dark:text-slate-400 fill-blue-600 mt-px"
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
          p-id="8297"
          width="20"
          height="20">
          <path
            d="M821.248 400.896c-66.56-100.352-180.224-166.912-309.248-166.912-129.024 0-243.2 66.56-309.248 166.912-16.896 25.6-30.208 52.736-40.448 81.92 10.24 28.672 23.552 56.32 40.448 81.92 66.56 100.352 180.224 166.912 309.248 166.912 129.024 0 243.2-66.56 309.248-166.912 16.896-25.6 30.208-52.736 40.448-81.92-9.728-28.672-23.552-56.32-40.448-81.92z m-309.248 286.72c-138.752 0-258.56-84.48-309.76-204.8 51.2-120.32 171.008-204.8 309.76-204.8s258.56 84.48 309.76 204.8c-51.2 120.32-171.008 204.8-309.76 204.8z"
            p-id="8298"
            fill="currentColor"></path>
          <path
            d="M512 346.112c-75.264 0-136.704 61.44-136.704 136.704S436.736 619.52 512 619.52s136.704-61.44 136.704-136.704-61.44-136.704-136.704-136.704z m0 229.376c-51.2 0-92.672-41.472-92.672-92.672S460.8 390.144 512 390.144s92.672 41.472 92.672 92.672-41.472 92.672-92.672 92.672z"
            p-id="8299"
            fill="currentColor"></path>
        </svg>

        <svg
          v-if="isArticleListHitsFetched && hit > hotArticleViews"
          class="icon text-red-400 dark:text-red-500 fill-blue-600 -mt-0"
          viewBox="0 0 1024 1024"
          width="14"
          height="14">
          <path
            d="M750.4 308.8c-4.8-4.8-12.8-1.6-12.8 4.8 0 40 16 97.6-49.6 123.2 0 0 9.6-268.8-281.6-310.4-6.4-1.6-11.2 4.8-9.6 11.2 11.2 38.4 32 156.8-72 230.4-6.4 4.8-11.2 8-17.6 12.8-30.4-38.4-75.2-52.8-94.4-56-3.2-1.6-6.4 3.2-4.8 6.4 28.8 80-27.2 168-27.2 168h1.6c-36.8 54.4-51.2 118.4-25.6 209.6 0 0 51.2 152 243.2 188.8l-6.4-6.4s-116.8-118.4-65.6-256c28.8-73.6 89.6-113.6 89.6-113.6s-28.8 96 38.4 124.8c0 0-11.2-144 112-195.2 0 0-14.4 75.2 48 163.2 64 89.6 107.2 200 22.4 272-3.2 1.6-4.8 4.8-8 6.4 94.4-24 153.6-78.4 193.6-132.8 60.8-84.8 88-275.2-73.6-451.2z"
            fill="currentColor"
            p-id="10161"></path>
        </svg>

        <p
          v-if="isArticleListHitsFetched"
          :class="{
            'text-red-400 dark:text-red-500': hit > hotArticleViews,
          }"
          class="text-gray-400 dark:text-slate-400 text-sm sd:text-sm md:text-sm ml-px">
          {{ hit }}
        </p>
      </div>

      <!-- 如果分类categories存在,则渲染第一个分类 -->
      <!-- <div v-if="categories" class="flex space-x-2">
        <span
          v-for="(category, index) of categories.slice(0, 1)"
          :key="index"
          @click="goCategory(category)"
          class="inline-block hidden border bg-transparent rounded px-2 py-0 text-sm font-semibold text-gray-300 dark:text-slate-300 mr-2">
          {{ category }}
        </span>
      </div> -->
    </div>
  </div>
</template>
