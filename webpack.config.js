const webpack = require('webpack');
const path = require('path');

var pragmas = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse('true'))
});

module.exports = {
  devtool: 'eval',

  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/js/main.js',
  ],

  output: {
    filename: 'canvas_spaces.js',
    path: './dist',
    publicPath: 'http://localhost:8080/dist/'
  },

  module: {
    noParse: /react-with-addons\.js$/,
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
    ],
    alias: {
      'react': __dirname + '/vendor/canvas/public/javascripts/bower/react/react-with-addons'
    }
  },

  devServer: {
    hot: true,
    historyApiFallback: true,
    contentBase: "./www",
    proxy: {
      '/api/v1/*': 'http://canvas.dev'
    }
  }

}