const { getDefaultConfig } = require("metro-config");

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  //added this
  resolver: {
    sourceExts: ["jsx", "js", "ts", "tsx", "cjs"],
  },
};

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig();
  return {
    transformer: {
      assetPlugins: ["expo-asset/tools/hashAssetFiles"],
    },
    resolver: {
      extraNodeModules: {
        "react-native-gesture-handler": require.resolve("react-native-gesture-handler"),
      },
    },
  };
})();
