const util = require('util');
const DBClient = require('../db/db-client');

function escapeHTML(str) {
  return str?.replace(/<|>|'|"|&/g, (matched) => {
    return {
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&apos;',
      '&': '&amp;',
    }[matched];
  });
}

module.exports = async function Save(req, res, params) {
  let title = escapeHTML(params.get('title'));
  let description = escapeHTML(params.get('description'));
  if (title && description) {
    await DBClient.connect();

    let result = 'success';

    await DBClient.todosCollection()
      .insertOne({ title, description })
      .catch((err) => {
        console.log(err);
        result = 'error';
      });

    res.writeHead(303, {
      'Content-Type': 'application/json',
      'Set-Cookie': `create=${result}; Path=/`,
      Location: '/',
    });
    res.end();
  } else {
    //I am a teapot :)
    res.statusCode = 418;
    res.end();
  }
};
