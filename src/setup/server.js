const restify = require('restify');
var server = restify.createServer();

console.log('chamou o brabo');

server.use(restify.plugins.queryParser({
    mapParams: false,
    allowDots: true
}))

server.use(restify.plugins.bodyParser({
  mapParams: false
}))

server.start = onStart => {
  server.listen(process.env.SERVER_PORT, process.env.SERVER_HOST, onStart)
  console.log(server);
  return server
}

module.exports=server
