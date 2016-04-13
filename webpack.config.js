const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require('copy-webpack-plugin');

// const NODE_ENV = process.env.NODE_ENV || "prod";

module.exports = {
  context: path.join(__dirname, "src"),
  entry: "./index.js",
  output: {
    path: path.join(__dirname, "build"),
    filename: "index.js",
  },
  devtool: "source-map",
  module: {
    loaders: [
      {
        test: /\.js|jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: "manifest.json" },
    ]),
  ],
};
