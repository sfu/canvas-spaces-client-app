const path = require('path');
const webpack = require('webpack');
const pragmas = new webpack.DefinePlugin({
  __DEV__: 'false'
});

module.exports = function (config) {
  config.set({
    browsers: [ 'Chrome' ],
    singleRun: true,
    frameworks: [ 'mocha' ],
    captureConsole: false,
    files: [
      'tests.webpack.js'
    ],
    preprocessors: {
      'tests.webpack.js': [ 'webpack', 'sourcemap' ]
    },
    reporters: [ 'mocha' ],
    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          { test: /\.js$/, loader: 'babel-loader' }
        ],
        noParse: [
           /node_modules\/sinon\//
        ]
      },
      plugins: [ pragmas ],
      resolve: {
        extensions: ['', '.js', '.jsx'],
        root: path.join(__dirname, '/src/js'),
        alias: {
          'sinon': 'sinon/pkg/sinon'
        }
      },
      externals: {
        'jsdom': 'window',
        'cheerio': 'window',
        'react/lib/ExecutionEnvironment': true
      }
    },
    webpackServer: {
      noInfo: true
    }
  });
};
