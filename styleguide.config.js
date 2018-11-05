module.exports = {
  propsParser: require('react-docgen-typescript').withCustomConfig('./tsconfig.json', {}).parse,
  components: 'src/app/components/**/*.tsx',
  webpackConfig: require('./webpack.config')
};
