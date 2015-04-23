const webpack = require('webpack');
const path = require('path');

const hostname = process.env.hostname || 'localhost';
const port = process.env.port || '8080';

var pragmas = new webpack.DefinePlugin({
  __DEV__: 'true'
});

module.exports = {
  devtool: 'eval',

  entry: [
    'webpack-dev-server/client?http://' + hostname + ':' + port,
    'webpack/hot/only-dev-server',
    './src/js/index.js',
  ],

  output: {
    filename: 'canvas_spaces.js',
    path: './dist',
    publicPath: 'http://' + hostname + ':' + port + '/dist/'
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
    root: __dirname + '/src/js'
  },

  devServer: {
    hot: true,
    host: hostname,
    port: port,
    historyApiFallback: true,
    proxy: {
      '/api/v1/*': 'http://canvas.dev',
      '/font/*': 'http://canvas.dev',
    }
  }
}
