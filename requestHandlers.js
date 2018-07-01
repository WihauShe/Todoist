var querystring = require('querystring');
var config = require('./config');
var path = require('path');
var fs = require('fs');


exports.start = function(req,res){
  res.render('login',{});
};
exports.index = function(req,res){
  var postData='';
  var name='';
  req.on('data',function(data){
    postData+=data;

  });
  req.on('end',function(){
    if(postData!==''){
      var querys = querystring.parse(postData);
      name = querys.logname;
      res.render('index',{
        username:name
      });
    }
  });
};
