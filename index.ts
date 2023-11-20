import ServerExpress from './classes/server';
import mongoose from 'mongoose';
import cors from 'cors';
import Crons from './classes/cron';
import express from 'express';
import bcrypt from 'bcrypt';
import authRoute from './routes/auth.route';
import fileUpload from 'express-fileupload';
import booksRoute from './routes/books.route';

require('dotenv').config();

const logger = require('morgan');

const server = new ServerExpress();

const crons = new Crons();
//Conectar DB
mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DATABASE_NAME}`)
    .then(() => {
        console.log(`Database ${process.env.DATABASE_NAME} connected`)
    })
    .catch(err => { if (err) throw err; })

server.start(() => {
    console.log(`Server running in port ${process.env.PORT}`);
});

//Morgan for logs of requests
server.app.use(logger('common'));
server.app.use(cors());

server.app.use(fileUpload());

//Body parser
server.app.use(express.urlencoded({ extended: true }));
server.app.use(express.json());

server.app.use('/api/auth', authRoute);
server.app.use('/api/books', booksRoute);
