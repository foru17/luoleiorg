<script setup lang="ts">
  import { onMounted, onUnmounted, watch, nextTick } from "vue";
  import DefaultTheme from "vitepress/theme";
  import { useData, useRouter } from "vitepress";
  import mediumZoom from "medium-zoom";
  import CategoryNav from "./CategoryNav.vue";
  import Article from "./Article.vue";
  import ArticleMeta from "./ArticleMeta.vue";
  import ArticleList from "./ArticleList.vue";
  import ArticleComment from "./ArticleComment.vue";
  import ArticleBottomNav from "./ArticleBottomNav.vue";
  import ArticleCopyright from "./ArticleCopyright.vue";
  import NotFound from "./NotFound.vue";
  import { getArticleLazyImage, getFaviconUrl } from "../utils";

  const { page, frontmatter } = useData();
  const { Layout } = DefaultTheme;

  let observer: IntersectionObserver | null = null;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  const router = useRouter();

  let imagesToLoad: HTMLImageElement[] = [];

  const handleImageError = (event: Event) => {
    const imgElement = event.target as HTMLImageElement;
    const originalSrc = imgElement.getAttribute("data-original-src");
    if (originalSrc) {
      imgElement.src = originalSrc;
    }
    imgElement.removeEventListener("error", handleImageError); // 只尝试加载备用资源一次
  };

  const lazyLoadImages = () => {
    const allImages = Array.from(document.querySelectorAll("img[data-src]")); // 转换 NodeList 为数组
    imagesToLoad = imagesToLoad.concat(allImages);

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            img.addEventListener("error", handleImageError);
            img.src = getArticleLazyImage(img.dataset.src!);
            img.removeAttribute("data-src");
            observer!.unobserve(img);

            imagesToLoad = imagesToLoad.filter((image) => image !== img);
          }
        });
      },
      {
        rootMargin: "1080px",
      }
    );

    if (imagesToLoad.length < 10) {
      forceLoadImages(0, imagesToLoad.length);
    } else {
      imagesToLoad.forEach((img) => observer!.observe(img));
    }
  };

  const forceLoadImages = (startIndex = 0, batchSize = 10) => {
    let loadedCount = 0;

    for (
      let i = startIndex;
      i < imagesToLoad.length && loadedCount < batchSize;
      i++
    ) {
      const imageElement = imagesToLoad[i] as HTMLImageElement;
      imageElement.addEventListener("error", handleImageError);
      imageElement.src = getArticleLazyImage(imageElement.dataset.src!);
      imageElement.removeAttribute("data-src");

      if (observer) {
        observer.unobserve(imageElement);
      }

      loadedCount++;
    }

    imagesToLoad = imagesToLoad.slice(loadedCount);

    if (imagesToLoad.length > 0) {
      timeoutId = setTimeout(() => {
        forceLoadImages(0);
      }, 10000);
    } else if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  const initImagesZoom = () => {
    mediumZoom(".main img", {
      background: "var(--vp-c-bg)",
    });
  };

  const addFavicon = () => {


    // 选择所有的 a 标签,不包括  .tweet-card 里面的 a 标签
    const aTags = document.querySelectorAll(".main a:not(.tweet-card a)");



    aTags.forEach((aTag) => {
      const domain = aTag.getAttribute("href")?.split("/")[2];
      // 如果域名存在且无 favicon 的 img 标签
      if (domain && !aTag.querySelector("img.favicon")) {
        aTag.classList.add("pending-favicon");
        const faviconUrl = getFaviconUrl(domain);
        const faviconImg = document.createElement("img");
        faviconImg.src = faviconUrl;
        faviconImg.className = "favicon";
        aTag.prepend(faviconImg);
        // 监听图片加载完成后移除 pending-favicon 类名
        faviconImg.onload = () => {
          aTag.classList.remove("pending-favicon");
          aTag.classList.add("has-favicon");
        }
        // 加载失败时也移除 pending-favicon 类名
        faviconImg.onerror = () => {
          aTag.classList.remove("pending-favicon");
          aTag.classList.add("err-favicon");
        }
        
      }
    });
  };

  onMounted(() => {
    nextTick(() => {
      lazyLoadImages();
      timeoutId = setTimeout(() => {
        forceLoadImages();
      }, 5000); // 5 秒开始提前加载图片
      if (
        localStorage.theme === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      ) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }

      // Whenever the user explicitly chooses light mode
      localStorage.theme = "light";

      // Whenever the user explicitly chooses dark mode
      localStorage.theme = "dark";

      // Whenever the user explicitly chooses to respect the OS preference
      localStorage.removeItem("theme");
      initImagesZoom();
      addFavicon();
    });
  });
  watch(router.route, () => {
    // 清除上一次的监听
    if (observer) {
      observer.disconnect();
      observer = null;
    }
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }

    nextTick(() => {
      lazyLoadImages();
      initImagesZoom();
      addFavicon();
    });
  });
  onUnmounted(() => {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
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
      <ArticleCopyright />
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
    <template #home-hero-before>
      <CategoryNav />
    </template>
    <!-- 主页模块 -->
    <template #home-hero-after>
      <!-- 首页文章列表模块 -->
      <ArticleList />
    </template>
  </Layout>
</template>
