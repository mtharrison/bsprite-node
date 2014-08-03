/**
 * Bsprite client - This is a browser library for working with Bsprite servers
 *
 * @see  matt-harrison.com/bsprites-a-new-way-of-serving-combined-resources-with-arraybuffer-and-data-uris/
 * @see  https://github.com/mtharrison/bsprite-go
 * @see  https://github.com/mtharrison/bsprite-client
 */
(function(global) {
  
  "use strict";

  var BSprite = function() {};

  BSprite.getImages = function(url, callback) {

    var images = [];

    var req = new XMLHttpRequest();
    req.open('GET', url, true);

    req.send();

    req.onload = function() {
      var resText = req.responseText;
      var mposition = req.getResponseHeader('X-Metadata-Offset');
      var mdataText = resText.substring(mposition);
      var mdata = JSON.parse(mdataText);

      for (var i = 0; i < mdata.length; i++) {
        var imgMetaData = mdata[i];
        var base64Data = resText.substring(imgMetaData.Offset, imgMetaData.Offset + imgMetaData.Length)

        var img = document.createElement('img');
        img.src = 'data:' + imgMetaData.MimeType + ';base64,' + base64Data
        images.push(img);
        callback(images);
      }

    }
  }

  global.BSprite = BSprite;

})(window);
