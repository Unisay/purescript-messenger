const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const WorkboxPlugin = require("workbox-webpack-plugin");

module.exports = {
  mode: "none",
  entry: "./src/index.js",
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist",
    hot: true,
  },
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      alwaysWriteToDisk: true,
      title: "Messenger",
      template: "src/index.html",
    }),
    // new WorkboxPlugin.GenerateSW({ clientsClaim: true, skipWaiting: true }),
  ],
  module: {
    rules: [
      {
        test: /\.purs$/,
        use: { loader: "purs-loader", options: { spago: true } },
      },
    ],
  },
};
