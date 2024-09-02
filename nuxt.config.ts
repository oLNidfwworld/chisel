// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  ssr: true,
  modules: ["@pinia/nuxt", "nuxt-swiper", "nuxt-svgo", "@nuxt/image", "@nuxt/eslint", "radix-vue"],
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
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          // TODO: group into one file
          additionalData:
            '@use "~/assets/styles/base/variables/colors.scss" as *;@use "~/assets/styles/mixins/media.scss" as *;',
        },
      },
    },
  },
});