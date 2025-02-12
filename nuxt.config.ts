// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: "src",
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  ssr: false,
  hooks: {
    "prerender:routes"({ routes }) {
      routes.clear(); // Do not generate any routes (except the defaults)
    },
  },
});
