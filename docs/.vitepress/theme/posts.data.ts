import { createContentLoader } from "vitepress";
import { formatShowDate } from "./utils";
import { categoryMap } from "./constant";
interface Post {
  title: string;
  url: string;
  date: {
    time: number;
    string: string;
    formatShowDate: string;
  };
  cover: string;
  categories: string[];
  excerpt: string | undefined;
}

declare const data: Post[];

// 声明一个全局所有文章分类的数组,结构是 {name:"分类名",text:"分类单词",count:"分类文章数量"}
declare const categoriesMeta: { name: string; text: string; count: number }[];

export { data, categoriesMeta };

export default createContentLoader("/*.md", {
  excerpt: true,
  transform(raw): Post[] {
    return raw
      .filter(({ frontmatter }) => !frontmatter.hide)
      .map(({ url, frontmatter, excerpt }) => ({
        title: frontmatter.title,
        url,
        excerpt,
        cover: frontmatter.cover,
        categories: frontmatter.categories,
        date: formatDate(frontmatter.date),
        layout: frontmatter.layout,
      }))
      .sort((a, b) => b.date.time - a.date.time);
  },
});

function formatDate(raw: string): Post["date"] {
  const date = new Date(raw);
  date.setUTCHours(12);
  return {
    time: +date,
    formatShowDate: formatShowDate(date),
    string: date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  };
}
