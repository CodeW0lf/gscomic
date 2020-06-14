module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.vue',
    './src/**/*.jsx',
    './public/*.html'
  ],
  theme: {
    fontFamily: {
      body: ['Roboto', 'sans-serif']
    },
    extend: {
      colors: {
        patreon: {
          default: '#9a473a',
          lighter: '#F96854'
        },
        primary: '#3B9C7D',
        discord: {
          default: '#7289da',
          lighter: '#99aab5'
        },
        twitter: {
          default: '#1B95E0',
          lighter: '#99aab5'
        }
      }
    },
  },
  variants: {},
  plugins: [],
}
