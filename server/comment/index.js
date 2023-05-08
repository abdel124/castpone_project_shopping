const express = require('express');
const morgan = require('morgan');
const { v4: uuidv4 } = require('uuid');


require('dotenv').config();
const {getComments,addComment,deleteComment } = require('./src/controller/Comment');
const app = express();

app.use(express.json());
app.use(morgan('dev'));

const TABLE_NAME = 'comment';

app.get('/', (req, res) => {
	res.send('Hello CRUD World');
});

app.get('/api/comments', async (req, res) => {
	try {
        console.log("hello")
        console.log(req.query.videoId)
		const items = await getComments(TABLE_NAME , req.query.videoId);
		console.log(items)
		res.status(200).json(items);
	} catch (err) {
		console.error(err);
		res.status(err.statusCode || 500).json({ message: err.message || 'Something went wrong' });
	}
});

app.post('/api/comments', async (req, res) => {
	const body = req.body;
	try {
		body.id = uuidv4();
		console.log('body')
		console.log(body)
		body.videoId = req.query.videoId
		const newItem = await addComment(TABLE_NAME, body);
		console.log('newItem', newItem);
		res.status(200).json(body);
	} catch (err) {
		console.error(err);
		res.status(err.statusCode || 500).json({ message: err.message || 'Something went wrong' });
	}
});

app.delete('/api/comments', async (req, res) => {
	const id = req.query.id;
	try {
		const item = await deleteComment(TABLE_NAME, id);
		res.status(200).json(item);
	} catch (err) {
		console.error(err);
		res.status(err.statusCode || 500).json({ message: err.message || 'Something went wrong' });
	}
});

const port = process.env.PORT || 8002;
app.listen(port, () => {
	console.log(`listening on port ${port}`);
});