<script setup lang="ts">
import { data as posts } from "../posts.data.js";
import { useData, withBase, useRoute, useRouter } from "vitepress";
const { frontmatter } = useData();
import { watch, nextTick, ref, onMounted, computed } from "vue";
import { getPreviewImage, getFormatNumber } from "../utils";

const props = defineProps({
  twitterId: String,
  author: String,
  tweetId: String,
  content: String,
  time: String,
  cover: String,
  avatar: String,
  image: String,
  comment: {
    type: Number,
    default: 1,
    required: false,
  },
  like: {
    type: Number,
    default: 1,
    required: false,
  },
});

const previewAvatarUrl = computed(() => {
  if (!props.avatar) {
    return "";
  }
  return getPreviewImage(props.avatar);
});

const goToTwitterProfile = () => {
  window.open(`https://twitter.com/${props.twitterId}`, "_blank");
};

const goToTweet = () => {
  window.open(
    `https://twitter.com/${props.twitterId}/status/${props.tweetId}`,
    "_blank"
  );
};

</script>

<template>
  <div class="px-2 mb-12 tweet-card rounded-xl">
    <div
      class="relative m-auto flex h-full w-full max-w-[32rem] flex-col gap-2 overflow-hidden rounded-xl border p-4 backdrop-blur-md shadow-xl hover:shadow-2xl transition ease-in-out dark:border-gray-500"
      @click="goToTweet"
    >
      <div class="flex flex-row justify-between tracking-tight">
        <div class="flex items-center space-x-2">
          <a
            :href="`https://twitter.com/${twitterId}`"
            target="_blank"
            rel="noreferrer"
            ><img
              title="Profile picture of {{author}}"
              :alt="author"
              height="48"
              width="48"
              :src="previewAvatarUrl"
              @click.stop.prevent="goToTwitterProfile"
              class="overflow-hidden border border-transparent rounded-full"
          /></a>
          <div>
            <a
              :href="`https://twitter.com/${twitterId}`"
              target="_blank"
              rel="noreferrer"
              class="flex items-center !font-semibold whitespace-nowrap"
              >{{ author }}</a
            >
            <div class="flex items-center space-x-1">
              <a
                :href="`https://twitter.com/${twitterId}`"
                target="_blank"
                rel="noreferrer"
                class="text-sm !text-gray-500 transition-all duration-75"
                >@{{ twitterId }}</a
              >
            </div>
          </div>
        </div>
        <a
          :href="`https://twitter.com/${twitterId}/status/${tweetId}`"
          target="_blank"
          rel="noreferrer"
          ><svg viewBox="0 0 24 24" class="inline w-6 h-6 ml-1">
            <path
              fill="rgb(29,161,242)"
              d="M23.643 4.937c-.835.37-1.732.62-2.675.733a4.67 4.67 0 002.048-2.578 9.3 9.3 0 01-2.958 1.13 4.66 4.66 0 00-7.938 4.25 13.229 13.229 0 01-9.602-4.868c-.4.69-.63 1.49-.63 2.342A4.66 4.66 0 003.96 9.824a4.647 4.647 0 01-2.11-.583v.06a4.66 4.66 0 003.737 4.568 4.692 4.692 0 01-2.104.08 4.661 4.661 0 004.352 3.234 9.348 9.348 0 01-5.786 1.995 9.5 9.5 0 01-1.112-.065 13.175 13.175 0 007.14 2.093c8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602a9.47 9.47 0 002.323-2.41z"
            ></path></svg
        ></a>
      </div>
      <div class="text-base leading-normal tracking-tighter break-words">
        {{ content }}
      </div>
      <p
        class="py-0 text-sm !leading-none !my-4 text-gray-500 dark:text-gray-400"
      >
        {{ time }}
      </p>
      <div
        div
        class="my-0 border border-b-0 border-gray-200 dark:border-gray-600"
      ></div>
      <div class="flex mt-0 text-gray-500 dark:text-gray-400">
        <div class="flex items-center mr-6 hover:text-gray-600" @click="goToTweet">
          <svg viewBox="0 0 24 24" aria-hidden="true" class="w-auto h-5 fill-current"><g><path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"></path></g></svg>
          <span class="ml-3">{{ comment }} </span>
        </div>
        <div class="flex items-center mr-6 hover:text-gray-600"  @click="goToTweet">
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            class="w-auto h-5 fill-current"
          >
            <g>
              <path
                d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"
              ></path>
            </g>
          </svg>
          <span class="ml-3">{{ like }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
