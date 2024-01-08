<script setup lang="ts">
  import "artalk/dist/Artalk.css";
  import Artalk from 'artalk'
  import { watch, nextTick, ref, onMounted } from "vue";
  import { useData, useRouter } from "vitepress";
  const artalkEl = ref<HTMLElement | null>(null);
  const router = useRouter();
  const page = useData().page;

  onMounted(async () => {
    await nextTick();
    initArtalk(page.value);
  });

  watch(
  () => router.route.data.relativePath,
  async (path) => {
    if (page.value.index !== true) {
      await nextTick();
      if (artalkEl.value) {
        initArtalk(page.value)
      }
    }
  }
);


  function getArtalkConfByPage(page: any) {
    // 这里待处理成配置
    const baseDomain = "https://luolei.org";
    return {
      pageKey: `${baseDomain}${location.pathname}/`,
      pageTitle: page.title,
      server: "https://artalk.is26.com",
      site: "罗磊的独立博客",
    };
  }

  function initArtalk(page: any) {
    const artalk = Artalk.init({
      el: artalkEl.value,
      gravatar: {
        mirror: "https://cravatar.cn/avatar/",
      },
      ...getArtalkConfByPage(page),
    });

    // 夜间模式
    const darkMode = document.querySelector("html").classList.contains("dark");
    artalk.setDarkMode(darkMode);
    new MutationObserver((mList) => {
      mList.forEach((m) => {
        if (m.attributeName !== "class") return;
        // @ts-ignore
        const darkMode = m.target.classList.contains("dark");
        artalk.setDarkMode(darkMode);
      });
    }).observe(document.querySelector("html"), { attributes: true });
  }
</script>
<template>
  <div id="Comments" ref="artalkEl" style="margin-top: 20px"></div>
</template>

<style></style>
