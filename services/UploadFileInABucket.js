'use strict';
const {CreateUuid} = require('./CreateUuid');
const path = require('path');
const fs = require('node:fs');
const _ = require("lodash");
const AWS = require('aws-sdk');

class UploadFileInABucket {   
    constructor() {
    }

    async invoke(file, mimetype, nombre) {

        return new Promise((resolve, reject) => {

            const jsonFile = JSON.parse(fs.readFileSync('./secure-files/data.json', 'utf8'));

            const bucketName = jsonFile.BUCKET_NAME;
            const region = jsonFile.BUCKET_REGION;
            const accessKey = jsonFile.AWS_ACCESS_KEY;
            const secretKey = jsonFile.AWS_SECRET_KEY;

            AWS.config = new AWS.Config();
            AWS.config.accessKeyId = accessKey;
            AWS.config.secretAccessKey = secretKey;
            AWS.config.region = region;

            const s3 = new AWS.S3();

            const params = {
                Bucket: bucketName,
                Key: nombre,
                Body: file
            };

            s3.upload(params, function (err, data) {
                if (data) {
                    resolve(true);
                }
                else if (err) {
                    reject(false);
                }
            });

        });
    }
}

module.exports = { UploadFileInABucket }