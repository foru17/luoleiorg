import tailwind from 'tailwindcss'
import tailwindTypography from '@tailwindcss/typography'
import tailwindLineClamp from '@tailwindcss/line-clamp'
export default {
  plugins: [
    tailwind({
      content: ['./docs/.vitepress/theme/**/*.vue'],
      plugins: [tailwindTypography,tailwindLineClamp]
    })
  ]
}
