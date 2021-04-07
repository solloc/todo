'use strict';

const AWS = require('aws-sdk');

const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports.update = (event, context, callback) => {
  
  console.log("Event: " + event);
  console.log("Event stringified: " + JSON.stringify(event));

  const timestamp = new Date().toISOString();
  // const data = JSON.parse(event);
  var data = event.body;
  console.log("Data: " + data);
  if (typeof data === 'string') {
    data = JSON.parse(data);
  }
  
  console.log("data.text: " + typeof data['text']);
  console.log("data.status: " + typeof data['status']);

  // validation
  if (typeof data['text'] !== 'string' || typeof data['status'] !== 'string') {
    console.error('Validation failed');
    callback(null, {
      statusCode: 400,
      headers: {
        'Content-Type': 'text/plain'
      },
      body: 'Couldn\'t update the task item (validation)',
    });
    return;
  }

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      taskID: event.pathParameters.id,
      status: "OPEN",
    },
    ExpressionAttributeNames: {
      '#task_text': 'text',
    },
    ExpressionAttributeValues: {
      ':text': data.text,
      ':modifiedAt': timestamp,
    },
    UpdateExpression: 'SET #task_text = :text, modifiedAt = :modifiedAt',
    ReturnValues: 'ALL_NEW',
  };

  dynamoDB.update(params, (error, result) => {
    // console.log("error: " + error);
    // console.log("result: " + JSON.stringify(result));
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t update the task item',
      });
      return;
    }

    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(result.Attributes),
    };
    callback(null, response);
  });
};
