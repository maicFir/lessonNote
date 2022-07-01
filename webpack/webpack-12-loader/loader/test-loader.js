const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      description: 'name is require string'
    },
    age: {
      type: 'number',
      description: 'age is require number'
    }
  }
}
const { validate } = require('schema-utils');
module.exports = function (source) {
  const options = this.getOptions();
  validate(schema, options);
  console.log(options);
  console.log('hello world')
  return source
}