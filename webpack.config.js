const webpack = require('webpack');
const nodeEnv = process.env.NODE_ENV || 'production';
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: {
    filename: './src/js/app.js'
  },
  output: {
    filename: '_build/bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  },
  optimization: {
    minimizer: [
      // we specify a custom UglifyJsPlugin here to get source maps in production
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: false,
          ecma: 6,
          mangle: true
        },
        sourceMap: true
      })
    ]
  },
  plugins: [
    // env plugin
    new webpack.DefinePlugin({
      'proccess.env': { NODE_ENV: JSON.stringify(nodeEnv)}
    })
  ]
};