module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: [
    './src/**/*.html',
    './src/**/*.vue',
    './src/**/*.jsx',
    './public/*.html',
  ],
  theme: {
    fontFamily: {
      body: ['Roboto', 'sans-serif'],
    },
    extend: {
      colors: {
        patreon: {
          default: '#9a473a',
          lighter: '#F96854',
        },
        primary: '#3B9C7D',
        discord: {
          default: '#7289da',
          lighter: '#99aab5',
        },
        twitter: {
          default: '#1B95E0',
          lighter: '#99aab5',
        },
        telegram: {
          default: '#2CA5E0',
          lighter: '#99aab5',
        },
      },
    },
    typography: (theme) => ({
      default: {
        css: {
          color: theme('colors.gray.500'),
          h1: {
            color: theme('colors.gray.400'),
          },
          h2: {
            color: theme('colors.gray.400'),
          },
        },
      },
    }),
  },
  variants: {
    textColor: ['responsive', 'hover', 'focus', 'group-hover', 'disabled'],
  },
  plugins: [require('@tailwindcss/typography')],
}
