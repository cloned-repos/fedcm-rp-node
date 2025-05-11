const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin');
const { resolve } = require('path');

module.exports = {
  entry: {
    'components-bundle': './public/components.js',
    'styles-bundle': './public/style.scss',
  },
  mode: 'production',
  output: {
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /components\.js$/,
        use: {
          loader: 'babel-loader',
          options: { presets: ['@babel/preset-env'] }
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new CopyPlugin({
      patterns: [
        { from: resolve("./public/client.js"), to: resolve("./dist/client.js") },
        { from: resolve("./node_modules/@fontsource/material-icons"), to: resolve("./dist/@fontsource/material-icons") },
        { from: resolve("./node_modules/lit-html"), to: resolve("./dist/lit-html") },
        { from: resolve("./node_modules/material-components-web"), to: resolve("./dist/material-components-web") },
        
      ],
    }),
  ],
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  }
}
