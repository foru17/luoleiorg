<script setup lang="ts">
import { data as posts } from "../posts.data.js";
import { useData, withBase, useRoute, useRouter } from "vitepress";
const { frontmatter } = useData();
import { watch, nextTick, ref, onMounted, computed } from "vue";
import { getPreviewImage, getFormatNumber } from "../utils";
import IconJD from "../icons/jd.svg?component";
import IconPDD from "../icons/pdd.svg?component";
import { title } from "process";
import type { PropType } from 'vue';

const props = defineProps({
  tweetId: String,
  content: String,
  time: String,
  product : String,
  cover: String,
  avatar: String,
  image: String,
  tags:{
    type:Array,
    default: () => [],
    required: false,
  },
  currency: {
    type: String,
    default: "USD",
    required: false,
  },
  prize: {
    type: Number,
    required: true,
  },
  originalPrice: Number,
  productOfficialPage: String,
  affiliateLink: {
    type: Object as PropType<{
      jd?: string;
      pdd?: string;
    }>,
    required: false,
  },
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

const previewImage = computed(() => {
  if (!props.image) {
    return "";
  }
  return getPreviewImage(props.image);
});

const showJD = computed(() => {
  return props.affiliateLink?.jd;
});

const showPDD = computed(() => {
  return props.affiliateLink?.pdd;
});

const getDisplayCurrency = () => {
  if (props.currency === "USD") {
    return "$";
  }
  return "¥";
};

const goProductShopPage = () => {
    if(props.affiliateLink?.jd){
        window.open(props.affiliateLink?.jd);
    }else if(props.affiliateLink?.pdd){
        window.open(props.affiliateLink?.pdd);
    }else{
        console.log("no affiliate link");
    }
       
};

const goToJD = () => {
  window.open(props.affiliateLink?.jd);
};

const goToPDD = () => {
  window.open(props.affiliateLink?.pdd);
};

</script>

<template>
  <div class="tweet-card">
    <div class="relative m-auto w-fit" @click="goProductShopPage">
      <div
        class="relative flex flex-row h-48 px-4 overflow-hidden bg-white border rounded-lg shadow-lg border-gray-50 dark:border-gray-600 dark:bg-gray-800 item item-center"
      >
        <div class="relative flex w-48 h-full overflow-hidden rounded-xl md:w-48 lg:w-48">
          <img
            class="object-cover w-48 h-full md:w-48 lg:w-48"
            :src="image"
            alt="product image"
          />
        </div>
        <div class="px-5 pb-5 mt-4">
            <h5 class="text-base tracking-tight text-slate-900 max-w-64 line-clamp-1 dark:text-white">
              {{ product }}
            </h5>
            <div class="flex flex-row flex-wrap gap-2 mt-2">
              <span v-for="tag in tags"  class="px-2 py-0.5 text-xs text-gray-500 bg-gray-100 rounded-md dark:text-gray-400 dark:bg-gray-700">{{ tag }}</span>
            </div>
          <div class="flex flex-col justify-start mb-1 items-">
            <p class="flex">
              <span class="text-xs text-slate-900 dark:text-gray-400">入手价格:{{ getDisplayCurrency()  }}{{ prize }} </span>
              <span class="ml-0 text-xs line-through md:ml-1 lg:ml-1 text-slate-900 dark:text-gray-400">原价:{{ getDisplayCurrency()  }}{{ originalPrice }}</span>
            </p>
          </div>
          <div class="flex flex-row justify-start gap-2">
              <IconPDD  v-if="showPDD" class="w-8 h-8"  @click.stop.prevent="goToPDD"/>
              <IconJD  v-if="showJD" class="w-8 h-8"  @click.stop.prevent="goToJD" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
