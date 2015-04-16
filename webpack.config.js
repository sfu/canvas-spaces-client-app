const webpack = require('webpack');
const path = require('path');

var pragmas = new webpack.DefinePlugin({
  __DEV__: 'true'
});

module.exports = {
  devtool: 'eval',

  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/js/index.js',
  ],

  output: {
    filename: 'canvas_spaces.js',
    path: './dist',
    publicPath: 'http://localhost:8080/dist/'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel-loader'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.scss$/,
        loader: "style!css!sass"
      }
    ]
  },

  plugins: [
    pragmas,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],

  resolve: {
    extensions: ['', '.js', '.jsx'],
    root: [
      __dirname + '/src/js',
      __dirname + '/vendor/canvas/public/javascripts'
    ],
    alias: {
      'react': 'react/addons',
      'react/addons/lib': 'react/../lib'
    }
  },

  devServer: {
    hot: true,
    proxy: {
      '/api/v1/*': 'http://canvas.dev'
    }
  },

  // this is for the old canvas-supplied jQuery 1.7.2
  amd: { jQuery: true }
}
