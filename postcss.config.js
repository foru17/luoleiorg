import tailwinddcssNesting from '@tailwindcss/nesting'
import tailwind from 'tailwindcss'

export default {
  plugins: [
    tailwinddcssNesting,
    tailwind({
      content: ['./docs/.vitepress/theme/**/*.vue'],
      plugins: []
    })

  ]
}
