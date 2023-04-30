const AWS = require('aws-sdk');
const  config  = require('../config/config.js') ;

const credentials = new AWS.SharedIniFileCredentials({profile: config.aws_profile});
AWS.config.credentials = credentials;

AWS.config.update({
	region: config.aws_region
});

const DocumentClient = new AWS.DynamoDB.DocumentClient();

const getComments = async (TABLE_NAME,videoId) => {
	const params = {
		TableName: TABLE_NAME,
		FilterExpression: '#videoId = :videoId',
		ExpressionAttributeNames: {
			'#videoId': 'videoId',
		},
		ExpressionAttributeValues: {
			':videoId': videoId,
		},
	
	};
	return await DocumentClient.scan(params).promise();
};


const addComment = async (TABLE_NAME, itemObject) => {
	const params = {
		TableName: TABLE_NAME,
		Item: itemObject,
	};
	return await DocumentClient.put(params).promise();
};

const deleteComment = async (TABLE_NAME, id) => {
	const params = {
		TableName: TABLE_NAME,
		Key: {
			id,
		},
	};
	return await DocumentClient.delete(params).promise();
};

module.exports = {
	DocumentClient,
	getComments,
	addComment,
	deleteComment,
};
