var path = require('path');
var fs = require('fs');

function route(handle,pathname,req,res){
  if(typeof(handle[pathname])==='function'){
    handle[pathname](req,res);
  }else if(pathname.startsWith('/public/')){
    var staticPath = path.join(__dirname,pathname);
    fs.readFile(staticPath,function(err,stdout,stderr){
      if(!err){
        var data = stdout;
        var type = staticPath.substr(staticPath.lastIndexOf(".")+1,path.length);
        res.writeHead(200,{'Content-type':"text/"+type});   //在这里设置文件类型，告诉浏览器解析方式
        res.write(data);
      }
      res.end();
    });
  }else{
    console.log("对于"+pathname+"没有找到相应的处理程序");
    res.writeHead(404,{"Content-Type":"text/html"});
    res.write("<img src='public/img/timg.jpg' style='height:100%;width:100%;'/>");
    res.end();
  }
}
exports.route = route;
