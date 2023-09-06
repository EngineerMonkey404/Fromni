// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["~/assets/css/main.css"],
  modules: [
    // Simple usage
    "@nuxtjs/eslint-module",
    "@pinia/nuxt",
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  eslint: {
    emitError: false,
    emitWarning: false,
  },
  devtools: { enabled: true },
});
