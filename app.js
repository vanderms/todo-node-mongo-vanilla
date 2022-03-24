require('dotenv').config();
const http = require('http');
const fs = require('fs').promises;
const staticController = require('./controllers/static');
const _404 = require('./controllers/_404');
const homepageController = require('./controllers/homepage');
const newController = require('./controllers/new');
const DBClient = require('./db/db-client');

function router(req, res) {
  console.log(req.url);
  console.log(req.method);

  switch (true) {
    case req.method === 'GET' && req.url.indexOf('/public') === 0:
      return staticController(req, res);

    case req.method === 'GET' && req.url === '/':
      return homepageController(req, res);

    case req.method === 'GET' && req.url === '/new/':
      return newController(req, res);

    default:
      return _404(req, res);
  }
}

async function main() {
  const server = http.createServer(router);
  const port = process.env.PORT ?? 3000;
  await DBClient.instance();
  server.listen(port, () => {
    console.log(`server running at http://localhost:${port}`);
  });
}

main();
