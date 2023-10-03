module.exports = {
  printWidth: 80,
  tabWidth: 2,
  trailingComma: 'all',
  singleQuote: true,
  semi: true,
  importOrder: [
    '^app(/*)(.*)$',
    '^pages(/*)(.*)$',
    '^widgets/(.*)$',
    '^features/(.*)$',
    '^entities/(.*)$',
    '^shared/(.*)$',
    '^[./]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: ['@trivago/prettier-plugin-sort-imports'],
};
