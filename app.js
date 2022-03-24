require('dotenv').config();
const http = require('http');
const fs = require('fs').promises;
const staticController = require('./controllers/static');
const _404 = require('./controllers/_404');
const homepageController = require('./controllers/homepage');
const newController = require('./controllers/new');
const saveController = require('./controllers/save');
const DBClient = require('./db/db-client');
const { URLSearchParams } = require('url');


function post(req, res) {
  let body = '';

  req.on('data', (data) => {
    body += data;
    if (body.length > 1e6) req.connection.destroy();
  });

  req.on('end', () => {
    const params = new URLSearchParams(body.toString());
    if (req.url === '/save/') return saveController(req, res, params);
    return _404(req, res);
  });
}

function get(req, res) {
  if (req.url.indexOf('/public') === 0) return staticController(req, res);
  if (req.url === '/') return homepageController(req, res);
  if (req.url === '/new/') return newController(req, res);
  return _404(req, res);
}

function router(req, res) {
  if (req.method === 'GET') return get(req, res);
  if (req.method === 'POST') return post(req, res);
  return _404(req, res);
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
