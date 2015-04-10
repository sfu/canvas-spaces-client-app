var webpack = require('webpack');
var path = require('path');
var Clean = require("clean-webpack-plugin");

var pragmas = new webpack.DefinePlugin({
  __DEV__: JSON.stringify('false')),
});

module.exports = {
  entry: './src/js/main.js',

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
    root: [
      __dirname + '/src/js',
    ],
    alias: {
      'react': __dirname + '/vendor/canvas/public/javascripts/bower/react/react-with-addons',
    }
  },
}