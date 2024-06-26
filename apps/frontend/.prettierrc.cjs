module.exports = {
  printWidth: 80,
  tabWidth: 2,
  trailingComma: 'all',
  singleQuote: true,
  semi: true,
  importOrder: [
    '^assets/(.*)$',
    '^app(/*)(.*)$',
    '^pages(/*)(.*)$',
    '^widgets/(.*)$',
    '^features/(.*)$',
    '^entities/(.*)$',
    '^shared/(.*)$',
    '^[./]',
  ],
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: ['@trivago/prettier-plugin-sort-imports'],
};
