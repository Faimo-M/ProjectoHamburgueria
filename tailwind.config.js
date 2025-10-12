/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{hmtl,js,jsx,ts,tsx}"],
    theme: {
        extend: {
         backgroundImage: {
            'home': "url('./assets/bg.png')",
          },
        },
    },
    plugins: [],
}