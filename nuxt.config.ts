import { resolve } from 'path';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  ssr: true,
  modules: ["@pinia/nuxt", "nuxt-swiper", "nuxt-svgo", "@nuxt/image", "@nuxt/eslint", "radix-vue/nuxt", "@nuxt/content"],
  css: ["./assets/styles/main.scss"], 
  svgo: {
    autoImportPath: "./assets/icons/",
    componentPrefix: "i",
    svgoConfig: { 
      plugins: [
        {
          name: "preset-default",
          params: {
            overrides: {
              mergePaths: false,
              removeViewBox: false,
              convertPathData : false,
              cleanupIds: false
            },
          },
        },
        {
          name: "removeAttrs",
          params: {
            attrs: "(class)",
          },
        },
      ],
    },
  }, 
  swiper : {
    modules : [ 'grid', 'thumbs']
  },
  runtimeConfig : {
    public : {
      apiUrl : process.env.API_BASE_URL,
      siteUrl : process.env.BASE_URL,
    }
  },
  hooks : {
    'pages:extend' ( pages ) {
      pages.push({
        name : 'city-level-catalog',
        path : '/realty/:city/',
        file :  resolve(__dirname, './pages/realty/realty-sections.vue')
      }),
      pages.push({
        name : 'offer-type-catalog',
        path : '/realty/:city/:offerType/',
        file :  resolve(__dirname, './pages/realty/realty-sections.vue')
      }), 
      pages.push({
        name : 'object-catalog',
        path : '/realty/:city/:offerType/:section/',
        file :  resolve(__dirname, './pages/realty/realty-sections.vue')
      }), 
      pages.push({
        name : 'object-type-catalog',
        path : '/realty/:city/:offerType/:section/:objectType',
        file :  resolve(__dirname, './pages/realty/realty-sections.vue')
      })
    }
  }
});