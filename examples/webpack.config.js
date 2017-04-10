'use strict';
const path = require('path');

module.exports = {
  entry: './main.js',
  output: {
  	filename: 'bundle.js'
  },
  resolveLoader: {
    alias: {
      'spm-loader': path.resolve('../index.js')
    }
  },
  module: {
  	rules: [{
  		test: /\.jsx?$/,
      use: [
        'babel-loader',
        'spm-loader?goldlog=/tb&context=spm_self&key=spmKey' // change it as your wish, remember to change attribute if you change context or key
      ],
  	}]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  }
};