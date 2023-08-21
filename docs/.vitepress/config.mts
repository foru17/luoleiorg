import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "罗磊的独立博客",
  description: "luolei.org",
  cleanUrls: true,
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'ZUOLUOTV™', link: '/markdown-examples' },
      { text: '视频', link: '/zuoluotv' },
      { text: '社群', link: '/social-network' },
      { text: '关于', link: '/about' }
    ],
    socialLinks: [
      { icon: 'twitter', link: 'https://x.com/foru17' },
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
