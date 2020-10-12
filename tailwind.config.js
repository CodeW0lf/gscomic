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
        primary: {
          default: '#3B9C7D',
          lighter: '#57e7b9',
        },
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
      spacing: {
        0.5: '0.125rem',
        1.5: '0.375rem',
        2.5: '0.625rem',
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
    backgroundColor: ['hover', 'group-hover'],
  },
  plugins: [require('@tailwindcss/typography')],
}
