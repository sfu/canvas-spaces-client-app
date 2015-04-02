var path = require('path');


module.exports = {
  entry: './src/js/main.js',
  output: {
    filename: 'canvas_spaces.js',
    path: './dist'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader' },
    ]
  },
  resolve: {
    root: [
      __dirname + '/src/js',
    ],
    alias: {
      'canvas/react': __dirname + '/vendor/canvas/public/javascripts/bower/react/react-with-addons'
    }
  }
}