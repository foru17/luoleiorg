<script setup lang="ts">
  import { data as posts } from "../posts.data.js";
  import { useData, withBase } from "vitepress";
  const { frontmatter } = useData();
  import { watch, nextTick, ref, onMounted, computed } from "vue";
  import { getPreviewImage } from "../utils";
  const props = defineProps<{
    url: string;
    title: string;
    cover: string;
    date: Object;
  }>();

  let timeoutHandle = null;
  const imgRef = ref<HTMLImageElement | null>(null);

  const imageLoaded = ref(false);
  const imageError = ref(false);

  const onImageLoad = () => {
    imageError.value = false;
    imageLoaded.value = true;
  };

  const onImageError = () => {
    console.log("image error", props.cover);
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
    class="w-full w-1/1 sd:w-1/3 md:w-1/4 px-6 py-3 sd:px-3 sd:py-3 flex flex-col flex-grow flex-shrink h-100 md:h-100 ld:h-40">
    <div
      class="flex-1 bg-white dark:bg-slate-800 rounded-t overflow-hidden h-64 shadow-lg ease-in-out hover:shadow-2xl duration-300">
      <a
        :href="withBase(url)"
        class="flex flex-wrap no-underline hover:no-underline">
        <div
          class="overflow-hidden w-full h-60 md:h-40 ld:h-40 relative bg-zinc-100">
          <img
            loading="lazy"
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
                class="relative inline-flex rounded-full h-10 w-10 bg-slate-200"></span>
            </span>

            <div
              v-if="imageError"
              class="w-0 h-0 mt-1 border-l-[20px] border-l-transparent border-t-[30px] border-t-slate-200 border-r-[20px] border-r-transparent"></div>
            <div class="flex-1 space-y-6 py-1">
              <div class="h-4 bg-slate-200 rounded"></div>
              <div class="space-y-3">
                <div class="grid grid-cols-3 gap-4">
                  <div class="h-4 bg-slate-200 rounded col-span-2"></div>
                  <div class="h-4 bg-slate-200 rounded col-span-1"></div>
                </div>
                <div class="h-4 bg-slate-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full px-6 mt-5">
          <p
            class="font-medium break-normal text-2xl sd:text-lg md:text-lg text-gray-900 dark:text-slate-400 line-clamp-2">
            {{ title }}
          </p>
        </div>
      </a>
    </div>
    <div
      class="flex-none mt-auto bg-white dark:bg-slate-800 rounded-b rounded-t-none overflow-hidden shadow-lg p-6 h-16">
      <div class="flex items-center justify-between">
        <p class="text-gray-400 text-base sd:text-sm md:text-sm">
          {{ date.formatShowDate }}
        </p>
      </div>
    </div>
  </div>
</template>
