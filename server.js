var http = require('http');
var url = require('url');
var fs = require('fs');
var config = require('./config');
var render = require('./common/render');
function start(route,handle){
  function onRequest(req,res){
    if(req.url!=="/favicon.ico"){
      var pathname = url.parse(req.url).pathname;
      render(res);
      route(handle,pathname,req,res);
    }
  }
  http.createServer(onRequest).listen(config.port,config.host,function(){
    console.log('server is listening at port '+config.port);
    console.log('please visit http://'+config.host+':'+config.port);
  });
}
exports.start = start;
