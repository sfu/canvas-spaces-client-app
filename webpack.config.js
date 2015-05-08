const webpack = require('webpack');
const path = require('path');
const config = require('config');
const hostname = config.get('dev_server_hostname');
const port = config.get('dev_server_port');

var pragmas = new webpack.DefinePlugin({
  __DEV__: 'true',
  __CANVAS_API_TOKEN__: JSON.stringify(config.get('api_token'))
});

module.exports = {
  devtool: 'eval',

  entry: [
    'webpack-dev-server/client?http://' + hostname + ':' + port,
    'webpack/hot/only-dev-server',
    path.join(__dirname, '/node_modules/babel-core/browser-polyfill.js'),
    './src/js/index.js'
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
        loader: 'style!css!sass'
      }
    ],
    noParse: [
      /\/babel-core\/browser-polyfill\.js$/
    ]

  },

  plugins: [
    pragmas,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],

  resolve: {
    extensions: ['', '.js', '.jsx'],
    root: path.join(__dirname, '/src/js')
  },

  devServer: {
    hot: true,
    host: hostname,
    port: port,
    historyApiFallback: true,
    proxy: {
      '/api/v1/*': config.get('api_proxy'),
      '/font/*': config.get('api_proxy'),
      '/images/*': config.get('api_proxy')
    }
  }
};
