/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {}
  },
  plugins: [],
  // other settings
  'tailwindCSS.includeLanguages': {
    javascript: 'javascript',
    html: 'HTML',
    css: 'scss'
  },
  'editor.quickSuggestions': {
    strings: true
  }
}
