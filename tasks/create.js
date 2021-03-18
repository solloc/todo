'use strict';

// const uuid = require('uuid');
const { nanoid } = require('nanoid');
const AWS = require('aws-sdk');

const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports.create = (event, context, callback) => {

  const data = JSON.parse(event.body);
  if (typeof data.text !== 'string') {
    console.error('Validation Failed');
    callback(null, {
      statusCode: 400,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Couldn\'t create the todo item.',
    });
    return;
  }

  const timestamp = new Date().toISOString();

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
      taskID: nanoid(8),
      status: "OPEN",
      text: data.text,
      createdAt: timestamp,
      modifiedAt: timestamp,
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
