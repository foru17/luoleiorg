<script setup lang="ts">
import { data as posts } from "../posts.data.js";
import { useData, withBase, useRoute, useRouter } from "vitepress";
const { frontmatter } = useData();
import { watch, nextTick, ref, onMounted, computed } from "vue";
import { getPreviewImage, getFormatNumber } from "../utils";
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
    class="flex-1 h-64 overflow-hidden duration-300 ease-in-out bg-white rounded-t shadow-lg dark:bg-zinc-800 hover:shadow-2xl"
  >
    <div class="flex flex-wrap no-underline hover:no-underline">
      <ClientOnly>
        <a
          :href="articleUrl"
          class="relative w-full overflow-hidden h-60 md:h-40 ld:h-40 bg-zinc-100 dark:bg-neutral-900"
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
            <svg
              v-if="categories.includes('zuoluotv')"
              class="absolute left-6 bottom-2 h-7 w-7 md:h-5 md:w-5"
              viewBox="0 0 473.931 473.931"
              xml:space="preserve"
            >
              <circle
                style="fill: #d42428"
                cx="236.966"
                cy="236.966"
                r="236.966"
              />
              <path
                style="fill: #cc202d"
                d="M404.518,69.38c92.541,92.549,92.549,242.593,0,335.142c-92.541,92.541-242.593,92.545-335.142,0
	L404.518,69.38z"
              />
              <path
                style="fill: #ba202e"
                d="M470.321,277.964L310.843,118.487l-12.864,12.864l-12.864-12.864l-14.099,14.099l9.47,9.47
	l-3.091,3.091l-24.557-24.557l-1.048,1.055l-33.092-33.092l-14.099,14.099l3.858,3.858l-5.665,5.665l-23.854-23.854l-9.889,9.889
	l23.255,56.003l-10.473,42.997l28.632,28.639l-72.418,5.066l-1.096,125.667l116.537,116.679
	C362.678,465.505,451.836,383.833,470.321,277.964z"
              />
              <path
                style="fill: #ffffff"
                d="M321.724,291.91h-15.289l0.075-8.875c0-3.948,3.237-7.169,7.199-7.169h0.98
	c3.963,0,7.214,3.222,7.214,7.169L321.724,291.91z M264.404,272.89c-3.865,0-7.038,2.608-7.038,5.796v43.161
	c0,3.188,3.173,5.781,7.038,5.781c3.895,0,7.068-2.593,7.068-5.781v-43.165C271.472,275.498,268.299,272.89,264.404,272.89z
	 M357.473,248.752v82.102c0,19.697-17.077,35.809-37.96,35.809H163.444c-20.887,0-37.96-16.116-37.96-35.809v-82.102
	c0-19.697,17.074-35.816,37.96-35.816h156.073C340.395,212.936,357.473,229.059,357.473,248.752z M173.85,339.771l-0.007-86.487
	l19.345,0.007v-12.819l-51.573-0.079v12.595l16.101,0.049v86.73h16.134V339.771z M231.847,266.17h-16.131v46.181
	c0,6.683,0.4,10.024-0.022,11.199c-1.317,3.581-7.214,7.383-9.508,0.389c-0.389-1.227-0.045-4.924-0.052-11.274l-0.075-46.499
	h-16.041l0.06,45.765c0.007,7.016-0.161,12.247,0.052,14.627c0.393,4.198,0.247,9.096,4.15,11.884
	c7.252,5.235,21.163-0.778,24.643-8.251l-0.03,9.534l12.95,0.019V266.17H231.847z M283.45,319.052l-0.03-38.439
	c-0.015-14.653-10.971-23.427-25.856-11.573l0.067-28.58l-16.116,0.026l-0.079,98.637l13.25-0.195l1.205-6.148
	C272.83,348.332,283.479,337.683,283.45,319.052z M333.941,313.96l-12.101,0.064c0,0.483-0.022,1.033-0.03,1.639v6.75
	c0,3.611-2.982,6.552-6.608,6.552h-2.369c-3.633,0-6.615-2.941-6.615-6.552v-0.748v-7.431v-9.579h27.697V294.23
	c0-7.614-0.198-15.229-0.827-19.584c-1.979-13.781-21.317-15.966-31.09-8.913c-3.068,2.204-5.407,5.152-6.776,9.119
	c-1.373,3.963-2.054,9.369-2.054,16.247v22.918C293.178,352.115,339.452,346.73,333.941,313.96z M271.895,189.524
	c0.827,2.028,2.118,3.663,3.88,4.905c1.725,1.212,3.948,1.83,6.6,1.83c2.324,0,4.385-0.629,6.174-1.927
	c1.792-1.291,3.304-3.214,4.531-5.788l-0.307,6.331h17.979v-76.467h-14.155v59.513c0,3.218-2.66,5.856-5.905,5.856
	c-3.222,0-5.89-2.638-5.89-5.856v-59.513h-14.769v51.573c0,6.571,0.116,10.952,0.314,13.175
	C270.559,185.363,271.064,187.477,271.895,189.524z M217.408,146.337c0-7.341,0.614-13.07,1.826-17.201
	c1.22-4.12,3.427-7.431,6.608-9.923c3.18-2.511,7.252-3.764,12.191-3.764c4.157,0,7.723,0.819,10.705,2.417
	c2.982,1.609,5.298,3.693,6.892,6.271c1.639,2.586,2.739,5.246,3.334,7.966c0.606,2.754,0.898,6.919,0.898,12.52v19.341
	c0,7.094-0.284,12.31-0.834,15.626c-0.543,3.323-1.717,6.402-3.536,9.287c-1.796,2.859-4.116,4.995-6.93,6.357
	c-2.836,1.381-6.08,2.054-9.755,2.054c-4.093,0-7.551-0.565-10.391-1.751c-2.851-1.175-5.059-2.949-6.627-5.302
	c-1.594-2.357-2.705-5.227-3.375-8.572c-0.681-3.349-1.003-8.374-1.003-15.079v-20.247H217.408z M231.484,176.716
	c0,4.325,3.229,7.861,7.154,7.861s7.132-3.532,7.132-7.861v-40.71c0-4.325-3.207-7.861-7.132-7.861s-7.154,3.532-7.154,7.861
	V176.716z M181.722,197.269h16.969l0.015-58.648l20.045-50.241h-18.555l-10.657,37.324l-10.81-37.421h-18.357l21.324,50.372
	L181.722,197.269z"
              />
            </svg>
          </div>
          <div
            v-if="!imageLoaded || imageError"
            :class="{ 'animate-pulse': !imageLoaded }"
            class="flex p-2 mt-6 space-x-4"
          >
            <span v-if="!imageError" class="relative flex w-10 h-10">
              <span
                class="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-sky-100"
              ></span>
              <span
                class="relative inline-flex w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-600"
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
                    class="h-8 col-span-2 rounded md:h-4 bg-slate-200 dark:bg-slate-600"
                  ></div>
                  <div
                    class="h-8 col-span-1 rounded md:h-4 bg-slate-200 dark:bg-slate-600"
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
      <div class="w-full px-6 mt-5">
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
    class="flex-none h-12 px-6 py-3 mt-auto overflow-hidden bg-white rounded-t-none rounded-b shadow-lg dark:bg-zinc-800"
  >
    <div class="flex items-center justify-between">
      <p
        class="text-sm text-gray-400 dark:text-slate-400 sd:text-sm md:text-sm"
      >
        <svg
          class="h-3 w-3 inline-block -mt-0.5"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" />
          <rect x="4" y="5" width="16" height="16" rx="2" />
          <line x1="16" y1="3" x2="16" y2="7" />
          <line x1="8" y1="3" x2="8" y2="7" />
          <line x1="4" y1="11" x2="20" y2="11" />
          <rect x="8" y="15" width="2" height="2" />
        </svg>
        {{ date.formatShowDate }}
      </p>

      <div class="flex items-center justify-items-end">
        <svg
          v-if="!isArticleListHitsFetched"
          aria-hidden="true"
          class="w-3 h-3 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>

        <svg
          v-if="isArticleListHitsFetched && hit <= hotArticleViews"
          class="inline-block w-3 h-3 mr-1 text-gray-400 dark:text-slate-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
        <svg
          v-if="isArticleListHitsFetched && hit > hotArticleViews"
          class="-mt-0 text-red-400 icon dark:text-red-500 fill-blue-600"
          viewBox="0 0 1024 1024"
          width="14"
          height="14"
        >
          <path
            d="M750.4 308.8c-4.8-4.8-12.8-1.6-12.8 4.8 0 40 16 97.6-49.6 123.2 0 0 9.6-268.8-281.6-310.4-6.4-1.6-11.2 4.8-9.6 11.2 11.2 38.4 32 156.8-72 230.4-6.4 4.8-11.2 8-17.6 12.8-30.4-38.4-75.2-52.8-94.4-56-3.2-1.6-6.4 3.2-4.8 6.4 28.8 80-27.2 168-27.2 168h1.6c-36.8 54.4-51.2 118.4-25.6 209.6 0 0 51.2 152 243.2 188.8l-6.4-6.4s-116.8-118.4-65.6-256c28.8-73.6 89.6-113.6 89.6-113.6s-28.8 96 38.4 124.8c0 0-11.2-144 112-195.2 0 0-14.4 75.2 48 163.2 64 89.6 107.2 200 22.4 272-3.2 1.6-4.8 4.8-8 6.4 94.4-24 153.6-78.4 193.6-132.8 60.8-84.8 88-275.2-73.6-451.2z"
            fill="currentColor"
            p-id="10161"
          ></path>
        </svg>

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

      <!-- 如果分类categories存在,则渲染第一个分类 -->
      <!-- <div v-if="categories" class="flex space-x-2">
        <span
          v-for="(category, index) of categories.slice(0, 1)"
          :key="index"
          @click="goCategory(category)"
          class="hidden inline-block px-2 py-0 mr-2 text-sm font-semibold text-gray-300 bg-transparent border rounded dark:text-slate-300">
          {{ category }}
        </span>
      </div> -->
    </div>
  </div>
</template>
