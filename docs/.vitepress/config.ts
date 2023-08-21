import { defineConfig } from 'vitepress'
import { rss } from './genFeed'
export default defineConfig({
  title: "罗磊的独立博客",
  description: "luolei.org",
  cleanUrls: true,
  appearance:false,
  ignoreDeadLinks: true,
  displayAllHeaders: true,
  base:'/',
  buildEnd: rss,
  markdown: {
    lineNumbers: true
  },
  head: [
    [
      'script',
      {
        async: true,
        src: 'https://www.googletagmanager.com/gtag/js?id=G-TG5VK8GPSG',
      },
    ],
    [
      'script',
      {},
      "window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-TG5VK8GPSG');",
    ],
  ],
  themeConfig: {
    logo:'./logo.svg',
    nav: [
      { text: 'ZUOLUOTV™', link: 'https://zuoluo.tv/youtube' },
      {
        text: '视频',
        items: [
          { text: 'YouTube', link: 'https://zuoluo.tv/youtube' },
          { text: '哔哩哔哩', link: 'https://zuoluo.tv/bilibili' },
        ]
      },
      { text: '关于', link: 'https://twitter.com/luoleiorg' },
      { text: 'RSS', link: 'https://luolei.org/rss.xml' }
    ],
    socialLinks: [
      { icon: 'twitter', link: 'https://twitter.com/luoleiorg' },
      { icon: 'github', link: 'https://github.com/foru17' }
    ],

    outlineTitle:'本文导览',
    lastUpdatedText: '最后更新时间',
    footer: {
      message: `<a href="https://luolei.org/">LUOLEI.ORG</a>.`,
      copyright: `Copyright © 2023 <a href="https://github.com/foru17" target="_blank">@foru17</a>.`
    }
  },

})
