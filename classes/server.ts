import express from 'express';
require('dotenv').config();

export default class ServerExpress {
    public app: express.Application;

    public port: number = process.env.PORT !== undefined ? Number(process.env.PORT) : 5000;

    constructor() {
        this.app = express();
    }

    start(callback: Function) {
        this.app.listen(this.port, callback());
    }
}
