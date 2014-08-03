var fs = require('fs');
var path = require('path');
var mime = require('mime');

var BSprite = function(){};

BSprite.makeSync = function(files) {
  var buffers = [];
  var metadata = [];
  var pointer = 0;
  var buf;

  files.forEach(function(file){
    buf = fs.readFileSync(file);
    var base64string = buf.toString('base64');
    var base64buf = new Buffer(base64string);
    buffers.push(base64buf);
    metadata.push({
      Offset: pointer,
      Length: base64string.length,
      Name: path.basename(file, path.extname(file)),
      MimeType: mime.lookup(file),
    });
    pointer += base64string.length;
  });
  
  buffers.push(new Buffer(JSON.stringify(metadata)));

  return {
    headers: [
      {key: 'Content-type', value: 'text/plain'},
      {key: 'X-Metadata-Offset', value: pointer},
    ],
    data: Buffer.concat(buffers)
  };
};

module.exports = BSprite;
