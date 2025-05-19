/**
 * @see https://prettier.io/docs/configuration
 * @type {import('prettier').Config}
 */
const config = {
  trailingComma: 'all',
  tabWidth: 2,
  printWidth: 120,
  semi: true,
  singleQuote: true,
  plugins: ['prettier-plugin-tailwindcss'],
};

export default config;
