import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "罗磊的独立博客",
  description: "luolei.org",
  base: '/',
  cleanUrls: true,
  appearance:false,
  lastUpdated: false,
  ignoreDeadLinks: true,
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    nav: [
      { text: 'ZUOLUOTV™', link: 'https://zuoluo.tv/youtube' },
      {
        text: '视频',
        items: [
          { text: 'YouTube', link: '/item-1' },
          { text: '哔哩哔哩', link: '/item-2' },
        ]
      },
      { text: '社群', link: '/social-network' },
      { text: '关于', link: '/about' }
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
