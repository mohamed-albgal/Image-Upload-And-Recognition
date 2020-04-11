import { s3Info } from './keys.js';
const AWS = require('aws-sdk');
AWS.Congfig({
	accessKeyId: s3Info.ACCESS_KEY,
	secretAccessKey: s3Info.SECRET_KEY,
	region: s3Info.BUCKET_REGION
});
// tutorial source:
	//https://medium.com/@diego.f.rodriguezh/direct-image-upload-to-aws-s3-with-react-and-express-2f063bc15430
const bucket = s3Info.BUCKET_NAME;
const S3 = new AWS.S3();

// GET url generator
const generateGET = (key) => {
	return new Promise((resolve, reject) => {
		const params = {
			bucket,
			key,
			Expires: 120
		};
		S3.getSignedURL('getObject', params, (err,url) => {
			if (err) {
				reject(err);
			}else {
				resolve(url)
			}
		});
	});
}

//PUT url generator
const generatePUT = (key, type) => {
	return new Promise((resolve, reject) => {
		const params = {
			bucket,
			key,
			type
		};
		S3.getSignedUrl('putObject', params, (err,url) => {
			if (err) {
				reject(err)
			}else {
				resolve(url);
			}
		});
	});
}

/*
why/where stopped

this wil be called from an express server for get and put urls
the front end will then take the image uploads and add or retrieve from them using the urls
the problem with this is that anyone can add or modify, even if they images do not belong to the user
, must tie to sign in token , use identitypool