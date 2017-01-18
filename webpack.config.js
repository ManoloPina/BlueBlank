const webpack = require('webpack');

module.exports = {
  module: {
    loaders: [
      {loader: 'babel-loader'}
    ]
  },
  node: {
    fs: 'fs-extra'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ]
};
