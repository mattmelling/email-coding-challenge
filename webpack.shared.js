const nodeExternals = require('webpack-node-externals');
const eslint = require('eslint-webpack-plugin');
module.exports = {
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader'
            }],
        }, {
            test: /\.hbs$/i,
            use: [{
                loader: 'html-loader',
                options: {
                    esModule: false
                }
            }]
        }]
    },
    plugins: [
        new eslint()
    ],
    externals: [nodeExternals()],
};
