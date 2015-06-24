var webpack = require('webpack');
var path = require('path');
var Clean = require('clean-webpack-plugin');

var pragmas = new webpack.DefinePlugin({
  __DEV__: 'false'
});

module.exports = {
  entry: [
    path.join(__dirname, '/node_modules/babel-core/browser-polyfill.js'),
    './src/js/index.js'
  ],

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
    new Clean('dist'),
    new webpack.ProvidePlugin({
      'es6-promise': 'es6-promise',
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    })
  ],

  resolve: {
    extensions: ['', '.js', '.jsx'],
    root: path.join(__dirname, '/src/js')
  }
};
