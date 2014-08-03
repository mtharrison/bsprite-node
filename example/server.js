var express = require('express');
var bsprite = require('../index.js');
var compres = require('compression');
var app = express();
app.use(compres({filter: function(){return true;}}));

var sprite = bsprite.makeSync([
  __dirname + '/images/example1.jpg',
  __dirname + '/images/example2.jpg',
]);

app.get('/', function(req, res){
  res.sendfile(__dirname + '/index.html');
});

app.get('/bsprite.js', function(req, res){
  res.sendfile(__dirname + '/bsprite.js');
});

app.get('/images', function(req, res) {
  sprite.headers.forEach(function(header){
    res.setHeader(header.key, header.value);
  });
  res.end(sprite.data);
});

app.listen(4000);
