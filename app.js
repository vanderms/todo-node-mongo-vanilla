const http = require('http');
const dotenv = require('dotenv');
const fs = require('fs').promises;
const staticController = require('./controllers/static');
const _404Controller = require('./controllers/_404');
const homepageController = require('./controllers/homepage');

function router(req, res) {
  console.log(req.url);
  switch (true) {
    case req.url.indexOf('/public') === 0: // static files
      staticController(req, res);
      break;
    case req.url === '/': //homepage
      homepageController(req, res);
      break;
    default:
      _404Controller(req, res);
      break;
      
  }
}

const server = http.createServer(router);
const port = process.env.PORT ?? 3000;

server.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
