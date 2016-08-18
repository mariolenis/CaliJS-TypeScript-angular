/// <reference path="typings/index.d.ts" />
import * as express from 'express';
import * as path from 'path';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';

class Server {
    private app: express.Application;
    constructor() {
        this.app = express();
        this.app.use(logger('dev'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false}));
        this.app.use(express.static(path.join(__dirname, 'public')));
        this.app.get('/*', function(req, res)
        {
            res.sendFile(path.join(__dirname, 'public/index.html'));
        });
    }
    
    getServer(): express.Application
    {
        return this.app;
    }
}

let app = new Server();
export = app.getServer();