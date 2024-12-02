import * as Sentry from "@sentry/browser";
import { Theme } from "vitepress";
import { Integrations } from "@sentry/tracing";
import DefaultTheme from "vitepress/theme";
import Layout from "./components/Layout.vue";

import "./style.css";
import ArticleComment from "./components/ArticleComment.vue";
import TweetCard from "./components/TweetCard.vue";
import GearCard from "./components/GearCard.vue";
import { customConfigProvider } from "./configProvider";
export default {
  ...DefaultTheme,
  Layout: customConfigProvider(Layout),
  enhanceApp({ app }) {
    Sentry.init({
      dsn: "https://4fb5844861dc52c0f94cbf2c1aa5cec2@sentry.is26.com/2",
      integrations: [
        Sentry.browserTracingIntegration(),
        Sentry.replayIntegration({
          maskAllText: false,
          blockAllMedia: false,
        }),
      ],
      tracesSampleRate: 1.0,
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,
    });

    app.component("ArticleComment", ArticleComment);
    app.component("TweetCard", TweetCard);
    app.component("GearCard", GearCard);
  },
} as Theme;
