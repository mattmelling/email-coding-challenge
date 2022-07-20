const path = require('path');
const slsw = require('serverless-webpack');
const sharedConfig = require('./webpack.shared');
module.exports = Object.assign({}, sharedConfig, {
    entry: slsw.lib.entries,
    output: {
        libraryTarget: 'commonjs',
        path: path.join(__dirname, '.webpack'),
        filename: '[name].js'
    }
});
