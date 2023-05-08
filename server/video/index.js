const express = require('express');
var bodyParser = require('body-parser');
const morgan = require('morgan');
const formidable = require('formidable');
const { v4: uuidv4 } = require('uuid');
const jwt = require("jsonwebtoken");
const verifyToken = require('./VerifyToken')
const cookieParser = require('cookie-parser');
const { getVideo, deleteVideo, addVideo, search, random_v2} = require('./src/controller/video');

const createError = require("./error");
require('dotenv').config();
const app = express();

app.use(express.json());
app.use(morgan('dev'));
// for parsing application/json
app.use(bodyParser.json()); 
app.use(cookieParser());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded

const TABLE_NAME = 'videos';

app.get('/video', (req, res) => {
	res.send('Hello CRUD World');
});

app.get('/api/video', (req, res) => {
	res.send('Hello CRUD World');
});


app.get('/api/video/find/:id', async (req, res) => {
	try {
		const items = await getVideo(TABLE_NAME , req.params.id);
		res.status(200).json(items);
	} catch (err) {
		console.error(err);
		res.status(err.statusCode || 500).json({ message: err.message || 'Something went wrong' });
	}
});

app.get('/api/video/random', async (req, res) => {
	try {
		const items = await random_v2(TABLE_NAME , req.query.videoId);
		res.status(200).json(items);
	} catch (err) {
		console.error(err);
		res.status(err.statusCode || 500).json({ message: err.message || 'Something went wrong' });
	}
});

app.post('/api/video', verifyToken.verifyToken, async (req, res,next) => {
	const body = req.body;
	try {
		body.id = uuidv4();
		const newItem = await addVideo(TABLE_NAME, body);
		res.status(200).send(newItem)

	} catch (err) {
		console.error(err);
		res.status(err.statusCode || 500).json({ message: err.message || 'Something went wrong' });
	}
});

app.get("/api/videos/search", async (req, res) => {
	try {
		
		const items = await search(TABLE_NAME , req.query.q);
		res.status(200).json(items);
	} catch (err) {
		console.error(err);
		res.status(err.statusCode || 500).json({ message: err.message || 'Something went wrong' });
	}
});

app.delete('/api/video', async (req, res) => {
	const id = req.query.id;
	try {
		const item = await deleteVideo(TABLE_NAME, id);
		res.status(200).json(item);
	} catch (err) {
		console.error(err);
		res.status(err.statusCode || 500).json({ message: err.message || 'Something went wrong' });
	}
});



const port = process.env.PORT || 8003;
app.listen(port, () => {
	console.log(`listening on port ${port}`);
});