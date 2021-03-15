'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk');

const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports.create = (event, context, callback) => {

  // const timestamp = new Date().getTime();

  // return {
  //   statusCode: 200,
  //   body: JSON.stringify(
  //     {
  //       message: 'task create',
  //       input: event,
  //     },
  //     null,
  //     2
  //   ),
  // };

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      TaskID: uuid.v1(),
      Status: "OPEN",
      text: "default text"
    },
  };

  dynamoDB.put(params, (error, data) => {

    if (error) {
      console.error(error);
      const response = {
        statusCode: 501,
        body: JSON.stringify(params),
      };
      callback(null, response);
      return;
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify(params),
    };   
    callback(null, response);
  });
};
