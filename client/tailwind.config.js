/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },

    extend: {
      colors: {
        "on-pressed": "#001A83",
        button: "#002DE3",
        "brand-bg": "#D2D5F9",
        bg: "#FFFFFF",
        "secondary-bg": "#F7F7FC",
        tmain: "#0F1828",
        tsecondary: "#A4A4A4",
        danger: "#E94242",
        warning: "#FFA500",
        success: "#2CC069",
        safe: "#7BCBCF",
        disabled: "#ADB5BD",
        line: "#EDEDED",
      },
    },
  },
  plugins: [],
};
