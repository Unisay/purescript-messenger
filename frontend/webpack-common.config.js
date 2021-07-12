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
    rules: [
      {
        test: /\.css$/,
        include: __dirname + "/assets/styles",
        use: [
          { loader: "style-loader" },
          { loader: "css-loader", options: { importLoaders: 1 } },
          { loader: "postcss-loader" },
        ],
      },
    ],
  },
};
