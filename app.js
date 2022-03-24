const http = require('http');
const dotenv = require('dotenv');
const fs = require('fs').promises;
const staticController = require('./controllers/static');
const _404 = require('./controllers/_404');
const homepageController = require('./controllers/homepage');

function router(req, res) {
 
  switch (true) {
    case req.url.indexOf('/public') === 0:
      return staticController(req, res);
      
    case req.url === '/':
      return homepageController(req, res);
      
    default:
      return _404(req, res);   
      
  }
}

const server = http.createServer(router);
const port = process.env.PORT ?? 3000;

server.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
