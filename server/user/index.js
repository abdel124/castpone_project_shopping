const express = require('express');
const morgan = require('morgan');
const { v4: uuidv4 } = require('uuid');
const cookieParser = require('cookie-parser');
import { getUser , deleterUser } from '../controller/user';

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.user(cookieParser)

const TABLE_NAME = 'user';

app.get('/', (req, res) => {
	res.send('Hello CRUD World');
});

app.get('/user/find/:id', async (req, res) => {
	try {
        console.log("hello")
        console.log(req.query.userId)
		const user = await getUser(TABLE_NAME , req.query.userId);
		res.status(200).json(items);
	} catch (err) {
		console.error(err);
		res.status(err.statusCode || 500).json({ message: err.message || 'Something went wrong' });
	}
});


app.delete('/user/:id', async (req, res) => {
	const id = req.query.id;
    console.log(id)
	try {
		const item = await deleterUser(TABLE_NAME, id);
		res.status(200).json(item);
	} catch (err) {
		console.error(err);
		res.status(err.statusCode || 500).json({ message: err.message || 'Something went wrong' });
	}
});

const port = process.env.PORT || 8004;
app.listen(port, () => {
	console.log(`listening on port ${port}`);
});