'use strict';
module.exports = {
    mode: 'development',
    bail: true,
    output: {
        path: '/',
        publicPath: '/assets/',
        filename: '[name].js'
    },
    entry: {
        bundle: './src/ui.js'
    },
    resolve: {
        modules: [ 'node_modules' ],
        extensions: [ '.js', '.jsx' ]
    },
    module: {
        rules: [
        ]
    },
    plugins: [
    ],
};
