const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        { context: "assets/favicon/", from: "*.ico", to: "./" },
        { context: "assets/favicon/", from: "*.png", to: "./" },
        { context: "assets/images/", from: "*.svg", to: "./images" },
        { context: "assets/styles/", from: "*.css", to: "./styles" },
      ],
      options: { concurrency: 100 },
    }),
    new HtmlWebpackPlugin({
      alwaysWriteToDisk: true,
      title: "Webpack/Purescript Starter",
      template: "src/index.html",
    }),
    // new WorkboxPlugin.GenerateSW({ clientsClaim: true, skipWaiting: true }),
  ],
  module: {
    rules: [],
  },
};
