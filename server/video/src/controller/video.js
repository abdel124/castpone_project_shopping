const AWSXRay = require('aws-xray-sdk');
const AWS = AWSXRay.captureAWS(require('aws-sdk'));
const { v4: uuidv4 } = require('uuid');
const  c  = require('../config/config') ;

const credentials = new AWS.SharedIniFileCredentials({profile: c.config.aws_profile});
AWS.config.credentials = credentials;
AWS.config.update({
	region: c.config.aws_region
});

 const s3 = new AWS.S3({
	signatureVersion: 'v4',
	region: 'us-east-1',
	params: {Bucket: c.config.aws_media_bucket},
  });
const DocumentClient = new AWS.DynamoDB.DocumentClient();

const getVideo = async (TABLE_NAME,videoId) => {
	const params = {
		TableName: TABLE_NAME,
		FilterExpression: '#id = :id',
		ExpressionAttributeNames: {
			'#id': 'id',
		},
		ExpressionAttributeValues: {
			':id': videoId,
		},
	
	};
	return await DocumentClient.scan(params).promise();
};

const random_v2 = async (TABLE_NAME,videoId) => {
	const randomValue = Math.floor(Math.random() * 323)%10;
	const params = {
		
		TableName: TABLE_NAME,
	  };
	  const result = await DocumentClient.scan(params).promise();

  // Return a random subset of items
      return result
};


const search = async (TABLE_NAME,reg) =>{
	const params = {
		TableName: TABLE_NAME,
		FilterExpression: 'contains(title, :substr)',
		ExpressionAttributeValues: {
			':substr': reg
		}
	  };
	  
	  return await DocumentClient.scan(params).promise();
}

const getGetSignedUrl = async (key,content) =>{
    const signedUrlExpireSeconds = 60 * 5;
    return s3.getSignedUrl('getObject', {
        Bucket: VIDEO_S3_BUCKET,
        Key: key,
		ContentType: content,
        Expires: signedUrlExpireSeconds,
    });
}

// Generates an AWS signed URL for uploading objects
const getPutSignedUrl = (key , content) =>{
    const signedUrlExpireSeconds = 60 * 5;
    return s3.getSignedUrl('putObject', {
        Bucket: c.config.aws_media_bucket,
        Key: key,
		ContentType: content,
        Expires: signedUrlExpireSeconds,
    });
}


const addVideo = async (TABLE_NAME, itemObject) => {
	const randomValue = Math.floor(Math.random() * 323)%10;
	const uuid = uuidv4();
	const key_image= `https://${c.config.cloudfront}/${uuid}-image.jpeg`;
	const key_video= `https://${c.config.cloudfront}/${uuid}-video.mp4`;
	const params = {
		TableName: TABLE_NAME,
		Item: {
			...itemObject,
			random_value: randomValue,
			imgUrl:key_image,
			videoUrl:key_video,
			created_at: { N: Date.now().toString() },
		  },
	};
	const url_video=getPutSignedUrl(`${uuid}-image.jpeg`,`image/jpeg`)
	const url_image=getPutSignedUrl(`${uuid}-video.mp4`,`video/mp4`)
    await DocumentClient.put(params).promise();
	return [url_video,url_image]
};

const deleteVideo = async (TABLE_NAME, id) => {
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
	getVideo,
	getGetSignedUrl,
	getPutSignedUrl,
	addVideo,
	search,
	random_v2,
	deleteVideo
};
