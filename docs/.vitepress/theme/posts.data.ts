import { createContentLoader } from 'vitepress'
import { formatShowDate } from './utils'
interface Post {
  title: string
  url: string
  date: {
    time: number
    string: string,
    formatShowDate: string,
  }
  cover: string
  excerpt: string | undefined
}

declare const data: Post[]
export { data }

export default createContentLoader('/*.md', {
  excerpt: true,
  transform(raw): Post[] {
    return raw
      .filter(({ frontmatter }) => !frontmatter.hide)
      .map(({ url, frontmatter, excerpt }) => ({
        title: frontmatter.title,
        url,
        excerpt,
        cover: frontmatter.cover,
        date: formatDate(frontmatter.date),
        layout: frontmatter.layout
      }))
      .sort((a, b) => b.date.time - a.date.time)
  }
})

function formatDate(raw: string): Post['date'] {
  const date = new Date(raw)
  date.setUTCHours(12)
  return {
    time: +date,
    formatShowDate: formatShowDate(date),
    string: date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
}
