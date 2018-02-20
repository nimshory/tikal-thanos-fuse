'use strict';
const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const questionBucket = "thanos-fuse";

module.exports.getQuestionnaire = (event, context, callback) => {

    const key = event.queryStringParameters.id + ".json";
    let json;

    const response = {
        statusCode: 200
    };

    console.log("Getting s3 object");

    s3.getObject({Bucket: questionBucket, Key: key})
        .promise()
        .then((data) => {
            console.log("Got s3 object", data);
            json = JSON.parse(new Buffer(data.Body).toString("utf8"));
            console.log("JSON", json);
            const qs = json.questions;
            const parsed = {
                questions: qs.map(q => {
                    return {question: q.question, answers: q.answers}
                })
            };
            response.body = JSON.stringify(parsed);
            return callback(null, response);
        })
        .catch(err => {
            return callback(err);
        });

};
