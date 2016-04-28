const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require('copy-webpack-plugin');

// const NODE_ENV = process.env.NODE_ENV || "prod";

module.exports = {
  context: path.join(__dirname, "src"),
  entry: {
    popup: "./popup.js",
    background: "./background.js",
  },
  output: {
    path: path.join(__dirname, "build"),
    filename: "[name].js",
  },
  devtool: "source-map",
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel?cacheDirectory=cache',
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: "*.json" },
      { from: "img*.png", to: 'img' },
      { from: "*.html" },
    ]),
  ],
};
