const path = require("path");
const { mergeWithCustomize, customizeArray } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const commonConfig = require("./webpack-common.config.js");
// const WorkboxPlugin = require("workbox-webpack-plugin");

module.exports = mergeWithCustomize({
  customizeArray: customizeArray({ "module.rules.*": "prepend" }),
})(commonConfig, {
  mode: "development",
  entry: "./src/index-dev.js",
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist",
    hot: true,
  },
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  }
});
