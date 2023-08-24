import * as Sentry from "@sentry/vue";
import { Integrations } from "@sentry/tracing";
import DefaultTheme from "vitepress/theme";
import "./style.css";
import Layout from "./components/Layout.vue";
import ArticleComment from "./components/ArticleComment.vue";
import { Theme } from "vitepress";
export default {
  ...DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    Sentry.init({
      app: app,
      dsn: "https://28535f00024737c373688b8451acd0ce@sentry.is26.com/2",
      integrations: [
        new Integrations.BrowserTracing({
          tracingOrigins: ["localhost", "luolei.org", /^\//], // replace 'your-website.com' with your actual domain
        }),
      ],
      tracesSampleRate: 1.0,
    });

    app.component("ArticleComment", ArticleComment);
  },
} as Theme;
