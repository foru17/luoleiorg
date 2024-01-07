import postcssNested from 'postcss-nested'
import tailwind from 'tailwindcss'
import tailwindTypography from '@tailwindcss/typography'

export default {
  plugins: [
    postcssNested,
    tailwind({
      content: ['./docs/.vitepress/theme/**/*.vue'],
      plugins: [tailwindTypography]
    })

  ]
}
