'use strict';

const AWS = require('aws-sdk');

const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports.get = (event, context, callback) => {

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      taskID: event.pathParameters.id,
      status: "OPEN"
    },
  };

  dynamoDB.get(params, (error, result) => {
    console.log("error: " + error);
    console.log("result: " + JSON.stringify(result));
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t fetch the task item',
      });
      return;
    }
    
    if (!result.Item) {
      console.error("blank item");
      callback(null, {
        statusCode: 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t fetch the task item',
      });
      return;
    }    

    const response = {
      statusCode: 200,
      headers: { 
        "Access-Control-Allow-Origin": "*"
        },      
      body: JSON.stringify(result.Item),
    };
    callback(null, response);
  });
};
