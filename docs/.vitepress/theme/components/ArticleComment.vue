<script setup lang="ts">
  import "artalk/dist/Artalk.css";
  import { watch, nextTick, ref, onMounted } from "vue";
  import { data } from "../posts.data.js";
  import { useData, useRouter } from "vitepress";

  const artalkEl = ref<HTMLElement | null>(null);

  const router = useRouter();
  const page = useData().page;

  onMounted(() => {
    const script = document.createElement("script");
    script.src = `https://cdn.bootcdn.net/ajax/libs/artalk/2.5.5/Artalk.js`;
    document.getElementsByTagName("head")[0].appendChild(script);

    script.onload = () => {
      initArtalk(page.value);
    };
  });

  watch(
    () => router.route.data.relativePath,
    (path) => {
      if (page.value.index !== true) {
        nextTick(() => {
          Artalk.update(getArtalkConfByPage(page.value));
          Artalk.reload();
        });
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
    Artalk.init({
      el: artalkEl.value,
      gravatar: {
        mirror: "https://cravatar.cn/avatar/",
      },
      ...getArtalkConfByPage(page),
    });

    // 夜间模式
    const darkMode = document.querySelector("html").classList.contains("dark");
    Artalk.setDarkMode(darkMode);

    new MutationObserver((mList) => {
      mList.forEach((m) => {
        if (m.attributeName !== "class") return;

        // @ts-ignore
        const darkMode = m.target.classList.contains("dark");
        Artalk.setDarkMode(darkMode);
      });
    }).observe(document.querySelector("html"), { attributes: true });
  }
</script>
<template>
  <div id="Comments" ref="artalkEl" style="margin-top: 20px"></div>
</template>

<style></style>
