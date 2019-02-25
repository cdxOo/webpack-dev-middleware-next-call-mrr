'use strict';
var express = require('express'),
    webpack = require('webpack'),
    wdm = require('webpack-dev-middleware'),

    wpconf = require('../config/webpack'),

    app = express(),
    compiler = webpack(wpconf);

app.use(wdm(compiler, {
    lazy: true,
    noInfo: false,
    publicPath: wpconf.output.publicPath
}));

app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
            <head><title>TEST</title></head>
            <body>
                <div id="approot" />
                <script type="text/javascript" src="/assets/bundle.js"></script>
            </body>
        </html>
    `);
});

app.listen(3005);
