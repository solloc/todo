const path = require('path');
const slsw = require('serverless-webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: slsw.lib.entries,
    mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
    // mode: 'development',
    // entry: {
    //     create: './tasks/create.js',
    //     get: './tasks/get.js',
    //     list: './tasks/list.js',
    //     update: './tasks/update.js',
    // },
    target: 'node',
    externals: [nodeExternals()],
    optimization: {
        minimize: false,
    },
    // module: {
    //   loaders: [ ... ]
    // }
    // output: {
    //     libraryTarget: 'commonjs',
    //     path: path.join(__dirname, '.webpack'),
    //     filename: '[name].js'
    // },
  };