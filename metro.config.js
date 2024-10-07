const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

module.exports = mergeConfig(
  getDefaultConfig(__dirname),
  {
    transformer: {
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
      assetExts: getDefaultConfig(__dirname).resolver.assetExts.filter(ext => ext !== 'svg').concat(['png']), // Make sure PNG is included
      sourceExts: getDefaultConfig(__dirname).resolver.sourceExts.concat(['svg']), // Support SVG files
    },
  }
);