import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import prerender from '@prerenderer/rollup-plugin'
import path from 'path'

// Public routes to prerender for SEO (social media crawlers + search engines)
const prerenderRoutes = [
  '/',
  '/learn-to-learn',
  '/math',
  '/practice',
  '/ai',
  '/rapid-math',
  '/internship',
  '/login',
  '/register',
  // Junior grades
  '/junior/grade/1',
  '/junior/grade/2',
  '/junior/grade/3',
  '/junior/grade/4',
  // Middle grades
  '/middle/grade/5',
  '/middle/grade/6',
  '/middle/grade/7',
  // Senior grades
  '/senior/grade/8',
  '/senior/grade/9',
  '/senior/grade/10',
  '/senior/grade/11',
  '/senior/grade/12',
]

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    prerender({
      routes: prerenderRoutes,
      renderer: '@prerenderer/renderer-puppeteer',
      rendererOptions: {
        renderAfterDocumentEvent: 'app-rendered',
        maxConcurrentRoutes: 4,
      },
      postProcess(renderedRoute) {
        // Replace localhost references with production URL
        renderedRoute.html = renderedRoute.html
          .replace(/http:\/\/(localhost|127\.0\.0\.1):\d*/g, 'https://skill100.ai')
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    // headers: {
    //   "Cross-Origin-Opener-Policy": "same-origin-allow-popups",
    // },
  },
})
