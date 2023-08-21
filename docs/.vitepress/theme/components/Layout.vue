<script setup lang="ts">
  import DefaultTheme from "vitepress/theme";
  import { useData } from "vitepress";
  import Article from "./Article.vue";
  import ArticleMeta from "./ArticleMeta.vue";
  import ArticleList from "./ArticleList.vue";
  import ArticleComment from "./ArticleComment.vue";
  import ArticleBottomNav from "./ArticleBottomNav.vue";
  import NotFound from "./NotFound.vue";

  const { page, frontmatter } = useData();
  const { Layout } = DefaultTheme;
</script>

<template>
  <Layout>
    <!-- 文章顶部模块 -->
    <template #doc-before>
      <ArticleMeta />
    </template>
    <template #doc-bottom> </template>
    <!-- 文章尾部 -->
    <template #doc-after>
      <ArticleBottomNav />
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
      <!-- <NotFound v-else-if="page.isNotFound" /> -->

      <!-- <Home /> -->
    </template>
  </Layout>
</template>
