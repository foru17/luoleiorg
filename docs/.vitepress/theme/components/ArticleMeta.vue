<script setup lang="ts">
  import { ref, computed, onMounted, watch, nextTick } from "vue";
  import { useData, withBase, useRoute, useRouter } from "vitepress";
  import { getBannerImage, getFormatNumber } from "../utils";
  import IconCalendar from "../icons/calendar.svg?component";
  import IconEye from "../icons/eye.svg?component";
  import IconLoading from "../icons/loading.svg?component";

  
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
      class="overflow-hidden h-64 bg-center bg-cover rounded-md"
      :style="`
        background-image: url(${bannerImageUrl})`">
      <div class="flex items-center h-full bg-gray-900 bg-opacity-30">
        <div class="px-5 max-w-xl md:px-10">
          <h2
            class="text-3xl font-bold text-white break-normal line-clamp-4 sd: line-clamp-3 md: line-clamp-2">
            {{ title }}
          </h2>

          <!-- 如果categories 有值,则遍历渲染 -->
          <!-- <div v-if="categories" class="mt-2">
            <span
              v-for="(category, index) of categories"
              :key="index"
              @click="goCategory(category)"
              class="inline-block hidden px-3 py-1 mr-2 text-sm font-semibold text-white bg-transparent rounded-xl border">
              {{ category }}
            </span>
          </div> -->
          <p class="inline-block mt-2 mr-5 text-sm md:text-sm text-slate-200">
            <IconCalendar  class="inline-block -mt-0.5 mr-1 w-3 h-3"/>
         {{ date }}
          </p>

          <p
            class="inline-block mt-2 text-sm md:inline-block md:text-sm text-slate-200">
            <IconEye class="inline-block mr-1 w-3 h-3" />
          
            <i v-if="isPageHitsFetched" class="not-italic">{{
              getFormatNumber(pageHits)
            }}</i
            ><span v-if="!isPageHitsFetched" role="status" class="inline-block">
              <IconLoading  class="-mt-1 mr-2 w-2 h-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"/>
              <span class="sr-only">Loading...</span>
            </span>
          </p>

          <p class="mt-2 text-white"></p>
        </div>
      </div>
    </div>
  </div>
</template>
