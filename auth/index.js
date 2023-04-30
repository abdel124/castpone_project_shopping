//import express from 'express';
//import morgan from 'morgan';
//import * as uuid from 'uuid';
//import cookieParser from 'cookie-parser'; 
const express = require('express')
const morgan = require('morgan')
const { v4: uuidv4 } = require('uuid');
const cookieParser = require('cookie-parser');
const {signin , signup} = require('./src/controller/auth')
//require('dotenv').config();
const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

const TABLE_NAME = 'user';
app.get('/api/signout', (req, res) => {
	res.send('Hello CRUD World');
});

app.post('/api/signout', (req, res) => {

  res.clearCookie('access_token', { httpOnly: true });

  // Send response to client
  res.status(200).json({ message: 'Successfully signed out.' });
});


app.post('/api/signup', async (req, res) => {
	const body = req.body;
	try {
		const newItem = await signup(TABLE_NAME, body);
		console.log('newItem', newItem);
		res.status(200).json(body);
	} catch (err) {
		console.error(err);
		res.status(err.statusCode || 500).json({ message: err.message || 'Something went wrong' });
	}
});

app.post('/api/signin', async (req, res, next) => {
	try {
        console.log("hello")
        console.log(req.body)
		const payload = await signin(TABLE_NAME , req.body);
        if (!payload[0]) {
           const err =new Error();
           err.status = 400;
           err.message = 'wrong credentials';
           return next(err);
        }
        res
        .cookie("access_token", payload[0], {
          httpOnly: true,
        })
        .status(200)
        .json(payload[1]);
        console.log(payload)
        } catch (err) {
        console.log(err)
        }
});





const port = process.env.PORT || 8001;
app.listen(port, () => {
	console.log(`listening on port ${port}`);
});