const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const VIDEO_S3_BUCKET = 's3-video-abdel'
const CLOUDFRONT_DOMAINE = 'd1nfrm13yl8x0h.cloudfront.net'
AWS.config.update({
	region: 'us-east-1',
	accessKeyId: 'AKIAVC5MYQCC4HWTNU7U',
	secretAccessKey: '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',
});

 const s3 = new AWS.S3({
	signatureVersion: 'v4',
	region: 'us-east-1',
	params: {Bucket: VIDEO_S3_BUCKET},
  });

const DocumentClient = new AWS.DynamoDB.DocumentClient();

const getVideo = async (TABLE_NAME,videoId) => {
	console.log(videoId)
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
	console.log(randomValue)

	const params = {
		
		TableName: TABLE_NAME,
		Limit: 4, // retrieve only one item
	  };
	  const result = await DocumentClient.scan(params).promise();

  // Return a random subset of items
      return result
};

const random = async (TABLE_NAME,videoId) => {
	console.log(videoId)
	console.log(Date.now())
	const params = {
		TableName: TABLE_NAME,
		FilterExpression: '#id = :id',
		ExpressionAttributeNames: {
			'#id': 'id',
		},
		ExpressionAttributeValues: {
			':id': "18191b25-e579-44a7-ad52-17b5633dd5f3",
		},
	
	};
	return await DocumentClient.scan(params).promise();
};

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
        Bucket: VIDEO_S3_BUCKET,
        Key: key,
		ContentType: content,
        Expires: signedUrlExpireSeconds,
    });
}


const addVideo = async (TABLE_NAME, itemObject) => {
	console.log("yes fiel")
	console.log(itemObject)
	const randomValue = Math.floor(Math.random() * 323)%10;
	const uuid = uuidv4();
	const key_image= `https://${CLOUDFRONT_DOMAINE}/${uuid}-image.jpeg`;
	const key_video= `https://${CLOUDFRONT_DOMAINE}/${uuid}-video.mp4`;
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
	console.log(url_video)
	console.log(url_image)
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
	random,
	random_v2,
	deleteVideo
};
