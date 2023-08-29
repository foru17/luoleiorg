<script setup lang="ts">
  import { ref, computed, onMounted, watch, nextTick } from "vue";
  import { useData, withBase, useRoute, useRouter } from "vitepress";
  import { getBannerImage } from "../utils";

  const { frontmatter } = useData();
  const route = useRoute();
  const router = useRouter();
  const title = computed(() => frontmatter.value.title);
  const date = computed(() => frontmatter.value.date);
  const categories = computed(() => frontmatter.value.categories);
  const bannerImageUrl = computed(() => {
    return getBannerImage(frontmatter.value.cover);
  });

  const goCategory = (category: string) => {
    router.go(`/?category=${category}`);
  };
  const pageHits = ref<number>(0);
  const isPageHitsFetched = ref<boolean>(false);
  const fetchPageHits = async () => {
    try {
      const response = await fetch(
        `https://st.luolei.org/ga?page=${route.path}`
      );
      const { data } = await response.json();
      const currentPageHit = data.find(
        (item: any) => item.page === `${route.path}`
      );

      if (currentPageHit) {
        pageHits.value = currentPageHit.hit;
      }
      isPageHitsFetched.value = true;
    } catch (error) {
      console.error("Error fetching page hits:", error);
    }
  };

  onMounted(() => {
    fetchPageHits();
  });

  watch(
    () => router.route.data.relativePath,
    () => {
      isPageHitsFetched.value = false;
      fetchPageHits();
    }
  );
</script>

<template>
  <div class="w-auto">
    <div
      class="h-64 rounded-md overflow-hidden bg-cover bg-center"
      :style="`
        background-image: url(${bannerImageUrl})`">
      <div class="bg-gray-900 bg-opacity-30 flex items-center h-full">
        <div class="px-10 max-w-xl">
          <h2
            class="text-3xl text-white break-normal font-bold line-clamp-4 sd: line-clamp-3 md: line-clamp-2">
            {{ title }}
          </h2>

          <!-- 如果categories 有值,则遍历渲染 -->
          <!-- <div v-if="categories" class="mt-2">
            <span
              v-for="(category, index) of categories"
              :key="index"
              @click="goCategory(category)"
              class="hidden inline-block border bg-transparent rounded-xl px-3 py-1 text-sm font-semibold text-white mr-2">
              {{ category }}
            </span>
          </div> -->
          <p class="inline-block mt-2 text-base text-slate-200 mr-5">
            发布时间: {{ date }}
          </p>

          <p class="block md:inline-block mt-2 text-base text-slate-200">
            阅读量:
            <i v-if="isPageHitsFetched" class="not-italic">{{ pageHits }}</i
            ><span v-if="!isPageHitsFetched" role="status" class="inline-block">
              <svg
                aria-hidden="true"
                class="w-3 h-3 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
              <span class="sr-only">Loading...</span>
            </span>
          </p>

          <p class="mt-2 text-white"></p>
        </div>
      </div>
    </div>
  </div>
</template>
