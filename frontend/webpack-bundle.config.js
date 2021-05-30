const path = require("path");
const { mergeWithCustomize, customizeArray } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const commonConfig = require("./webpack-common.config.js");

module.exports = mergeWithCustomize({
  customizeArray: customizeArray({ "module.rules.*": "prepend" }),
})(commonConfig, {
  mode: "production",
  devtool: "source-map",
  entry: "./src/index-bundle.js",
  output: { filename: "main.js", path: path.resolve(__dirname, "dist") },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        // Use multi-process parallel running to improve the build speed
        // Default number of concurrent runs: os.cpus().length - 1
        parallel: true,
      }),
    ],
  },
});
