const { getDefaultConfig } = require("@expo/metro-config");

module.exports = (async () => {
  const defaultConfig = await getDefaultConfig(__dirname);

  return {
    ...defaultConfig,
    transformer: {
      ...defaultConfig.transformer,
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: true,
        },
      }),
    },
    resolver: {
      ...defaultConfig.resolver,
      sourceExts: [...defaultConfig.resolver.sourceExts, "jsx", "js", "ts", "tsx", "cjs"],
      extraNodeModules: {
        ...defaultConfig.resolver.extraNodeModules,
        "react-native-gesture-handler": require.resolve("react-native-gesture-handler"),
      },
    },
  };
})();
