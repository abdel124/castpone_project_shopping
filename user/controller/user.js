const AWS = require('aws-sdk');

AWS.config.update({
	region: 'us-east-1',
	accessKeyId: 'AKIAVC5MYQCCQJGZIT5Q',
	secretAccessKey: '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',
});

const DocumentClient = new AWS.DynamoDB.DocumentClient();

const getUser = async (TABLE_NAME,userId) => {
	const params = {
		TableName: TABLE_NAME,
		FilterExpression: '#userId = :userId',
		ExpressionAttributeNames: {
			'#userId': 'userId',
		},
		ExpressionAttributeValues: {
			':userId': userId,
		},
	
	};
	return await DocumentClient.scan(params).promise();
};


/*const addVideo = async (TABLE_NAME, itemObject) => {
	const params = {
		TableName: TABLE_NAME,
		Item: itemObject,
	};
	return await DocumentClient.put(params).promise();
};*/

const deleterUser = async (TABLE_NAME, id) => {
	const params = {
		TableName: TABLE_NAME,
		Key: {
			id,
		},
	};
	return await DocumentClient.delete(params).promise();
};

/*const generateUpdateQuery = (fields) => {
	let exp = {
		UpdateExpression: 'set',
		ExpressionAttributeNames: {},
		ExpressionAttributeValues: {},
	};
	Object.entries(fields).forEach(([key, item]) => {
		exp.UpdateExpression += ` #${key} = :${key},`;
		exp.ExpressionAttributeNames[`#${key}`] = key;
		exp.ExpressionAttributeValues[`:${key}`] = item;
	});
	exp.UpdateExpression = exp.UpdateExpression.slice(0, -1);
	return exp;
};*/

/*const updateComment = async (TABLE_NAME, id, itemObject) => {
	const expression = generateUpdateQuery(itemObject);
	const params = {
		TableName: TABLE_NAME,
		Key: {
			id,
		},
		ConditionExpression: 'attribute_exists(id)',
		...expression,
		ReturnValues: 'UPDATED_NEW',
	};
	return await DocumentClient.update(params).promise();
};*/


module.exports = {
  getUser,
  deleterUser,
};