const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.vue',
    './src/**/*.jsx',
    './public/*.html',
  ],
  darkMode: false,
  theme: {
    fontFamily: {
      body: ['Roboto', ...defaultTheme.fontFamily.sans],
    },
    extend: {
      colors: {
        patreon: {
          DEFAULT: '#9a473a',
          lighter: '#F96854',
        },
        primary: {
          DEFAULT: '#3B9C7D',
          lighter: '#57e7b9',
        },
        discord: {
          DEFAULT: '#7289da',
          lighter: '#99aab5',
        },
        twitter: {
          DEFAULT: '#1B95E0',
          lighter: '#99aab5',
        },
        telegram: {
          DEFAULT: '#2CA5E0',
          lighter: '#99aab5',
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.400'),
            h1: {
              color: theme('colors.gray.500'),
            },
            h2: {
              color: theme('colors.gray.500'),
            },
          },
        },
      }),
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
      textColor: ['disabled'],
      ringColor: ['hover'],
      ringWidth: ['hover'],
      ringOffsetWidth: ['hover'],
      ringOffsetColor: ['hover'],
      ringOpacity: ['hover'],
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
