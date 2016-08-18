"use strict";
/// <reference path="typings/index.d.ts" />
var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var Server = (function () {
    function Server() {
        this.app = express();
        this.app.use(logger('dev'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(express.static(path.join(__dirname, 'public')));
        this.app.get('/*', function (req, res) {
            res.sendFile(path.join(__dirname, 'public/index.html'));
        });
    }
    Server.prototype.getServer = function () {
        return this.app;
    };
    return Server;
}());
var app = new Server();
module.exports = app.getServer();
