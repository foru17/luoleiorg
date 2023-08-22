<script setup lang="ts">
  import { onMounted, onUnmounted, watch, nextTick } from "vue";
  import DefaultTheme from "vitepress/theme";
  import { useData, useRouter } from "vitepress";
  import Article from "./Article.vue";
  import ArticleMeta from "./ArticleMeta.vue";
  import ArticleList from "./ArticleList.vue";
  import ArticleComment from "./ArticleComment.vue";
  import ArticleBottomNav from "./ArticleBottomNav.vue";
  import NotFound from "./NotFound.vue";
  import { getArticleLazyImage } from "../utils";

  const { page, frontmatter } = useData();
  const { Layout } = DefaultTheme;

  let observer: IntersectionObserver | null = null;
  const router = useRouter();

  const lazyLoadImages = () => {
    const images = document.querySelectorAll("img[data-src]");
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            img.src = getArticleLazyImage(img.dataset.src!);
            img.removeAttribute("data-src");
            observer!.unobserve(img);
          }
        });
      },
      {
        rootMargin: "360px", // 提前200px加载
      }
    );
    images.forEach((img) => observer!.observe(img));
  };

  onMounted(() => {
    nextTick(() => {
      lazyLoadImages();
    });
  });
  watch(router.route, () => {
    // 清除上一次的监听
    if (observer) {
      observer.disconnect();
      observer = null;
    }
    nextTick(() => {
      lazyLoadImages();
    });
  });
  onUnmounted(() => {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
  });
</script>

<template>
  <Layout>
    <!-- 文章顶部模块 -->
    <template #doc-before>
      <ArticleMeta />
    </template>
    <template #doc-bottom> </template>

    <template #doc-footer-before>
      <ArticleBottomNav />
    </template>
    <!-- 文章尾部 -->
    <template #doc-after>
      <!-- 评论模块 -->
      <ClientOnly>
        <ArticleComment />
      </ClientOnly>
    </template>
    <template #aside-outline-before> </template>
    <template #home-hero-before> </template>
    <!-- 主页模块 -->
    <template #home-hero-after>
      <!-- 首页文章列表模块 -->
      <ArticleList v-if="frontmatter.index" />
    </template>
  </Layout>
</template>
