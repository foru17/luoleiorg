<script setup lang="ts">
import { data as posts } from "../posts.data.js";
import { useData, withBase, useRoute, useRouter } from "vitepress";
const { frontmatter } = useData();
import { watch, nextTick, ref, onMounted, computed } from "vue";
import { getPreviewImage, getFormatNumber } from "../utils";
import IconYouTube from "../icons/youtube.svg?component";
import IconCalendar from "../icons/calendar.svg?component";
import IconEye from "../icons/eye.svg?component";
import IconLoading from "../icons/loading.svg?component";
import IconFire from "../icons/fire.svg?component";
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
const route = useRoute();
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

const articleUrl = computed(() => {
  return withBase(props.url);
});
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

const hasNavQuery = computed(() => {
  // 如果url中有category或者 page 参数,则返回true
  const { searchParams } = new URL(window.location.href!);
  return searchParams.has("category") || searchParams.has("page");
});

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
    class="overflow-hidden flex-1 h-64 bg-white rounded-t shadow-lg duration-300 ease-in-out dark:bg-zinc-800 hover:shadow-2xl"
  >
    <div class="flex flex-wrap no-underline hover:no-underline min-h-60 md:min-h-40 ld:min-h-40">
      <ClientOnly>
        <a
          :href="articleUrl"
          class="overflow-hidden relative w-full h-60 md:h-40 ld:h-40 bg-zinc-100 dark:bg-neutral-900"
        >
          <img
            ref="imgRef"
            :src="previewImageUrl"
            @load="onImageLoad"
            @error="onImageError"
            :class="[
              'absolute',
              'top-0',
              'left-0',
              'object-cover',
              'w-full',
              'h-full',
              'duration-300',
              'ease-in',
              'rounded-t',
              'hover:scale-105',
              {
                'opacity-0': !imageLoaded || (imageLoaded && imageError),
                'opacity-100': imageLoaded && !imageError,
              },
            ]"
          />

          <!-- 如果分类中有zuoluotv或者视频,则展示youtube图标 -->
          <div>
            <IconYouTube v-if="categories.includes('zuoluotv')" class="absolute bottom-2 left-6 w-7 h-7 md:h-5 md:w-5"  />

          </div>
          <div
            v-if="!imageLoaded || imageError"
            :class="{ 'animate-pulse': !imageLoaded }"
            class="flex p-2 mt-6 space-x-4"
          >
            <span v-if="!imageError" class="flex relative w-10 h-10">
              <span
                class="inline-flex absolute w-full h-full bg-sky-100 rounded-full opacity-75 animate-ping"
              ></span>
              <span
                class="inline-flex relative w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-600"
              ></span>
            </span>

            <div
              v-if="imageError"
              class="md:block w-0 h-0 mt-1 border-l-[20px] border-l-transparent border-t-[30px] border-t-slate-200 dark:border-t-slate-600 border-r-[20px] border-r-transparent"
            ></div>
            <div class="flex-1 py-1 space-y-6">
              <div
                class="h-8 rounded md:h-4 bg-slate-200 dark:bg-slate-600"
              ></div>
              <div class="space-y-3">
                <div class="grid grid-cols-3 gap-4">
                  <div
                    class="col-span-2 h-8 rounded md:h-4 bg-slate-200 dark:bg-slate-600"
                  ></div>
                  <div
                    class="col-span-1 h-8 rounded md:h-4 bg-slate-200 dark:bg-slate-600"
                  ></div>
                </div>
                <div
                  class="h-8 rounded md:h-4 bg-slate-200 dark:bg-slate-600"
                ></div>
              </div>
            </div>
          </div>
        </a>
      </ClientOnly>
      <div class="px-6 mt-5 w-full">
        <ClientOnly>
          <a
            :href="articleUrl"
            class="h-auto text-base antialiased font-medium text-gray-800 break-normal md:h-12 sd:text-lg md:text-base dark:text-slate-300 line-clamp-2 font-fira"
          >
            {{ title }}
          </a>
        </ClientOnly>
      </div>
    </div>
  </div>
  <div
    class="overflow-hidden flex-none px-6 py-3 mt-auto h-12 bg-white rounded-t-none rounded-b shadow-lg dark:bg-zinc-800"
  >
    <div class="flex justify-between items-center">
      <p
        class="text-sm text-gray-400 dark:text-slate-400 sd:text-sm md:text-sm"
      >
        <IconCalendar   class="inline-block -mt-0.5 w-3 h-3" />
        {{ date.formatShowDate }}
      </p>

      <div class="flex justify-items-end items-center">

        <IconLoading  v-if="!isArticleListHitsFetched" class="w-3 h-3 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"/>
        <IconEye   v-if="isArticleListHitsFetched && hit <= hotArticleViews" class="inline-block mr-1 w-3 h-3 text-gray-400 dark:text-slate-400" />
        <IconFire   v-if="isArticleListHitsFetched && hit > hotArticleViews" class="-mt-0 text-red-400 icon dark:text-red-500 fill-blue-600" />
          
        <p
          v-if="isArticleListHitsFetched"
          class="ml-px text-sm text-gray-400 sd:text-sm md:text-sm"
          :class="{
            'text-red-400 dark:text-red-500': hit > hotArticleViews,
          }"
        >
          {{ getFormatNumber(hit) }}
        </p>
      </div>

    </div>
  </div>
</template>
