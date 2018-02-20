'use strict';
const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const fse = require('fs-extra');
const questionBucket = "thanos-fuse";

module.exports.getQuestionnaire = (event, context, callback) => {

    const key = event.queryStringParameters.id + ".json";
    let json;

    s3.getObject({Bucket: questionBucket, Key: key})
        .promise()
        .then((data) => {
            json = JSON.parse(new Buffer(data.Body).toString("utf8"));
            callback(null, json);
        })
        //.then(() => {
        //})
        .catch(err => {
            return callback(err);
        });

};
