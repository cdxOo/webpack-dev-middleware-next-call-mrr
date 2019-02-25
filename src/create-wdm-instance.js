'use strict';
var webpack = require('webpack'),
    wdm = require('webpack-dev-middleware'),

    wpconf = require('../config/webpack'),
    compiler = webpack(wpconf);

module.exports = () => (
    wdm(compiler, {
        //lazy: true,
        logLevel: 'silent',
        publicPath: wpconf.output.publicPath,
    })
);
