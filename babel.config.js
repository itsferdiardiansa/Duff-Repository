module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-optional-chaining',
    '@vue/babel-plugin-jsx',
  ],
  env: {
    test: {
      plugins: ['transform-require-context'],
    },
  },
};
