const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'src', 'pages', 'index.js'),
  devtool: 'inline-source-map',
  output: {
      filename: "main.js",
      path: path.resolve(__dirname, 'dist'),
      publicPath: '',
      clean: true
  },
  mode: 'development',
  devServer: {
      static: path.resolve(__dirname, 'dist'),
      compress: true,
      port: 8080,
      open: true
  },
  module: {
      rules: [
          {
              test: /\.js$/,
              use: 'babel-loader',
              exclude: '/node_modules/'
          },
          {
              test: /\.(png|svg|jpg|jpeg|gif|woff(2)?|eot|ttf|otf)$/,
              type: 'asset/resource'
          },
          {
               test: /\.css$/,

               use: [MiniCssExtractPlugin.loader, {
                 loader: 'css-loader',
                 options: { importLoaders: 1 }
              },
              'postcss-loader']
          },
      ]
  },
  plugins: [
      new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html')
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin()
  ]
};
