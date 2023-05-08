//import bcrypt from 'bcrypt-nodejs'
//import createError from '../error'
//import {jwt} from 'jsonwebtoken'
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const createError = require('../../error');
const  c  = require('../config/config.js') ;
const AWSXRay = require('aws-xray-sdk');
const AWS = AWSXRay.captureAWS(require('aws-sdk'));
const credentials = new AWS.SharedIniFileCredentials({profile: c.config.aws_profile});
AWS.config.credentials = credentials;

AWS.config.update({
	region: c.config.aws_region
});

const DocumentClient = new AWS.DynamoDB.DocumentClient();

 const signup = async (TABLE_NAME, itemObject) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(itemObject.password, salt);
    const newUser = ({ ...itemObject, password: hash });
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
		FilterExpression: '#email = :email',
		ExpressionAttributeNames: {
			'#email': 'email',
		},
		ExpressionAttributeValues: {
			':email': userBody.email,
		},
	
	};
	const user =  await DocumentClient.scan(params).promise();
    if (!user) return next(createError(404, "User not found!"));
	const isCorrect = await bcrypt.compare(userBody.password, user.Items[0].password);
    if (!isCorrect) return false;
    
    const token = jwt.sign({ id: userBody.id }, "Hello");
    return [token , user.Items[0].name , user.Items[0].email]
};

module.exports = {
	signin,
	signup,
};