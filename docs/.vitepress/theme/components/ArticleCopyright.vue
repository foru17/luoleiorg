<script setup lang="ts">
  import { ref, computed, onMounted, watch, nextTick } from "vue";
  import { useData, withBase, useRoute, useRouter } from "vitepress";
  import { getBannerImage } from "../utils";
  import IconCopyright from "../icons/copyright.svg?component";
  import IconMarkdown from "../icons/markdown.svg?component";
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
      class="relative px-5 py-5 rounded-md border md:px-5 md:py-5 border-zinc-300 dark:border-zinc-500">
      <section class="flex flex-col gap-y-[8px] text-sm md:text-sm">
        <IconCopyright class="absolute right-3 w-4 h-4 md:h-6 md:w-6 text-black-100 md:right-5"/>
       
        <div>
          <span class="mr-1 font-medium">作者:</span>
          <span>
            <a
              :href="authorLink"
              class="text-blue-600 dark:text-blue-300 hover:text-blue-500"
              rel="noreferrer"
              target="_blank">
              罗磊
            </a>
          </span>
        </div>

        <div>
          <span class="mr-1 font-medium">文章标题:</span>
          <span>
            <a
              :href="articleGithubLink"
              class="hover:text-blue-500"
              rel="noreferrer"
              target="_blank">
              {{ title
              }}<IconMarkdown class="inline-block -mt-1 ml-2 w-5 h-5" />
            </a>
          </span>
        </div>
        <div>
          <span class="mr-1 font-medium">发表时间:</span>
          <span>
            <span>
              {{ date }}
            </span>
          </span>
        </div>

        <div>
          <span class="mr-1 font-medium">文章链接:</span>
          <span>
            <a
              :href="articleLink"
              class="text-blue-600 dark:text-blue-300 hover:text-blue-500"
              rel="noreferrer"
              target="_blank">
              {{ articleLink }}
            </a>
          </span>
        </div>

        <div>
          <span class="mr-1 font-medium">版权说明:</span>
          <a
            href="https://creativecommons.org/licenses/by-nc-nd/4.0/deed.zh-hans"
            class="text-blue-600 dark:text-blue-300 hover:text-blue-500"
            rel="noreferrer"
            target="_blank">
            <span>CC BY-NC-ND 4.0 DEED </span>
          </a>
        </div>
      </section>
    </div>
  </div>
</template>
