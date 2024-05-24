// https://vitepress.dev/guide/custom-theme
import Layout from './Layout.vue'
import type { Theme } from 'vitepress'
import './style.css'
import G6Index from './G6.vue'

export default {
  Layout,
  enhanceApp({ app, router, siteData }) {
    app.component('G6Index', G6Index)
  }
} satisfies Theme

