const dynamoose = require('dynamoose');

const peopleSchema = new dynamoose.Schema({
  'id': Number,
  'name': String,
  'role': String,
});

const peopleTable = dynamoose.model('people', peopleSchema);

exports.handler = async (event) => {

  let id = event.pathParameters && event.pathParameters.id;
  let idNum = parseInt(id);

  let data = null;
  let status = 500;

  try {
    const person = await peopleTable.query('id').eq(idNum).exec();
    data = person;
    status = 200;

  } catch (e) {
    console.log(e);
    status = 400;
    data = new Error(e);
  }

  const response = {
    statusCode: status,
    body: JSON.stringify(data),
  };
  return response;
};
