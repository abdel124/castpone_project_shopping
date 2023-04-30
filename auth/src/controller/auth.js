//import bcrypt from 'bcrypt-nodejs'
//import createError from '../error'
//import {jwt} from 'jsonwebtoken'
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const createError = require('../../error');



const AWS = require('aws-sdk');

AWS.config.update({
	region: 'us-east-1',
	accessKeyId: 'AKIAVC5MYQCC4HWTNU7U',
	secretAccessKey: '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',
});

const DocumentClient = new AWS.DynamoDB.DocumentClient();

 const signup = async (TABLE_NAME, itemObject) => {
    console.log(itemObject)
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(itemObject.password, salt);
    const newUser = ({ ...itemObject, password: hash });
    console.log(newUser)
	const params = {
		TableName: TABLE_NAME,
		Item: newUser,
		ConditionExpression: "attribute_not_exists(email)"
	};
	
	return await DocumentClient.put(params,(err, res) => {
		if (err && err.code === "ConditionalCheckFailedException")
		  console.log("User Already exists");
		else if (err) console.log("Insert Failed with some other reason", err);
		else console.log("Sucessfully inserted");
	  }).promise();
};

 const signin = async (TABLE_NAME,userBody, next) => {
	const params = {
		TableName: TABLE_NAME,
		FilterExpression: '#name = :name',
		ExpressionAttributeNames: {
			'#name': 'name',
		},
		ExpressionAttributeValues: {
			':name': userBody.name,
		},
	
	};
	const user =  await DocumentClient.scan(params).promise();
    if (!user) return next(createError(404, "User not found!"));
	const isCorrect = await bcrypt.compare(userBody.password, user.Items[0].password);
	console.log(isCorrect);
    if (!isCorrect) return false;
    
    const token = jwt.sign({ id: userBody.id }, "Hello");
    return [token , user.Items[0].name]
};

module.exports = {
	signin,
	signup,
};