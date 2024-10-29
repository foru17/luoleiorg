import * as Sentry from "@sentry/browser";
import { Theme } from "vitepress";
import { Integrations } from "@sentry/tracing";
import DefaultTheme from "vitepress/theme";
import Layout from "./components/Layout.vue";

import "./style.css";
// import ThemeLayout from "./components/Layout.vue";
import ArticleComment from "./components/ArticleComment.vue";
import TweetCard from "./components/TweetCard.vue";
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
      tracesSampleRate: 1.0, //  Capture 100% of the transactions
      replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
      replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
    });

    app.component("ArticleComment", ArticleComment);
    app.component("TweetCard", TweetCard);
  },
} as Theme;
