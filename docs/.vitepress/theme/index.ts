
import DefaultTheme from 'vitepress/theme'
import './style.css'
import Layout from './components/Layout.vue'
import ArticleComment from './components/ArticleComment.vue'
import { Theme } from 'vitepress'
export default {
  ...DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('ArticleComment', ArticleComment)
  }
} as Theme;
