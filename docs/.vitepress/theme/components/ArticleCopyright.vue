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

  const authorLink = computed(() => {
    return `https://luolei.org`;
  });

  const articleGithubLink = computed(() => {
    return ` https://github.com/foru17/luoleiorg/tree/main/docs/${route.path}.md`;
  });

  const articleLink = computed(() => {
    return `https://luolei.org${route.path}`;
  });

  onMounted(() => {});
</script>

<template>
  <div class="w-auto">
    <div
      class="relative px-5 py-5 md:px-5 md:py-5 rounded-md border border-zinc-300 dark:border-zinc-500">
      <section class="flex flex-col gap-y-[8px] text-sm md:text-sm">
        <svg
          class="h-4 w-4 md:h-6 md:w-6 text-black-100 absolute right-3 md:right-5"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" />
          <circle cx="12" cy="12" r="9" />
          <path d="M14.5 9a3.5 4 0 1 0 0 6" />
        </svg>
        <div>
          <span class="font-medium mr-1">作者:</span>
          <span>
            <a
              :href="authorLink"
              class="text-blue-600 dark:text-blue-300"
              rel="noreferrer"
              target="_blank">
              罗磊
            </a>
          </span>
        </div>

        <div>
          <span class="font-medium mr-1">文章标题:</span>
          <span>
            <a :href="articleGithubLink" rel="noreferrer" target="_blank">
              {{ title
              }}<svg
                class="h-5 w-5 ml-2 inline-block -mt-1"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" />
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M7 15v-6l2 2l2 -2v6" />
                <path d="M14 13l2 2l2 -2m-2 2v-6" />
              </svg>
            </a>
          </span>
        </div>
        <div>
          <span class="font-medium mr-1">发表时间:</span>
          <span>
            <span>
              {{ date }}
            </span>
          </span>
        </div>

        <div>
          <span class="font-medium mr-1">文章链接:</span>
          <span>
            <a
              :href="articleLink"
              class="text-blue-600 dark:text-blue-300"
              rel="noreferrer"
              target="_blank">
              {{ articleLink }}
            </a>
          </span>
        </div>

        <div>
          <span class="font-medium mr-1">版权说明:</span>
          <a
            href="https://creativecommons.org/licenses/by-nc-nd/4.0/deed.zh-hans"
            class="text-blue-600 dark:text-blue-300"
            rel="noreferrer"
            target="_blank">
            <span> CC BY-NC-ND 4.0 DEED </span>
          </a>
        </div>
      </section>
    </div>
  </div>
</template>
