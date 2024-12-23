/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    // container: {
    //   center: true,
    //   padding: "2rem",
    //   screens: {
    //     "2xl": "1400px",
    //   },
    // },
    extend: {

      colors: {
        primary: '#00ad97',
        "accent-blue": "#2A84FF",
        'primary-light-text': '#202224',
        'secondary-light-text': '#58626e',
        'primary-dark-text': '#ffffff',
        'secondary-dark-text': '#58626e',
        'primary-light-bg': '#ffffff',
        'secondary-light-bg': '#EDEEF0',
        'primary-dark-bg': '#273142',
        'secondary-dark-bg': '#1B2431',
        'primary-dark': '#273142',
        'secondary-dark': '#1B2431',
      },
      fontFamily: {
        'cairo': ["Cairo", "sans-serif"],
        'inter': ["Inter", 'sans-serif']
      },
      boxShadow: {
        "light-100":
          "0px 12px 20px 0px rgba(184, 184, 184, 0.03), 0px 6px 12px 0px rgba(184, 184, 184, 0.02), 0px 2px 4px 0px rgba(184, 184, 184, 0.03)",
        "dark-100": "0px 2px 10px 0px rgba(46, 52, 56, 0.10)",
      },
      backgroundImage: {
        'hero-bg': "url('./assets/images/background2.jpg')",
        'joinus-bg': "url('./assets/images/back-add.jpg')",
      },
      screens: {
        xs: "420px",
      },

      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}