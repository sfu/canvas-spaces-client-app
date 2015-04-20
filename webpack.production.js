var webpack = require('webpack');
var path = require('path');
var Clean = require("clean-webpack-plugin");

var pragmas = new webpack.DefinePlugin({
  __DEV__: 'false'
});

module.exports = {
  entry: './src/js/index.js',

  output: {
    filename: 'canvas_spaces.js',
    path: './dist'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel-loader']
      }
    ]
  },

  plugins: [
    pragmas,
    new Clean('dist')
  ],

  resolve: {
    extensions: ['', '.js', '.jsx'],
    root: __dirname + '/src/js',
    alias: {
      'FormComponents': __dirname + '/src/js/FormComponents'
    }
  }
}
