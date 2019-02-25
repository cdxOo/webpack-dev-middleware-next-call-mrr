'use strict';
var express = require('express'),
    http = require('http'),

    getPort = require('get-port'),
    enableKillswitch = require('killable');

module.exports = async () => {
    var app = express(),
        port = await getPort();

    var server = http.createServer(app).listen(port);
    enableKillswitch(server);

    return ({
        server, app, port
    });
};
