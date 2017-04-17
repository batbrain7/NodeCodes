var express = require('express');
var app = express();
var morgan = require('morgan');
var cheerio = require('cheerio');
var request = require('request');
var fs = require('fs');

app.get('/scrapeg',function(req,res) {

  url = "https://www.google.com/search?site=&source=hp&q=love+the+way+you+lie&oq=love+the+way+&gs_l=hp.3..35i39k1j0l4j0i67k1j0l4.2285.4573.0.5253.17.12.1.0.0.0.1076.3875.3-3j1j2j0j1.7.0....0...1c.1.64.hp..9.6.2416.0..0i20k1.xgBiNQ6V91s";

  request(url,function(err,response,html){
    if(!err) {
      var $  = cheerio.load(html);
      var link,text;

      // $('.fl').filter(function() {
      //   var data = $(this);
      //   link = data.attr('href');
      //   text = data.children().text();
      // })

      // $('.fl').each(function(i,element) {
      //   var data = $(this);
      //   //console.log(data.text());
      //   console.log(data.attr('href'));
      // //  link = data.attr('href');
      // //  text = data.children().text();
      // })

      $('.g').each(function(i,element) {
        var data = $(this).next().next();
        console.log(data.text());
        //link = data.attr('href');
        console.log(link);

      })
    }
    //console.log(link);
    console.log(text);
    res.send(link);
    //res.send(text);
  });

})
app.listen(8080);

console.log('The server has started...');
exports = module.exports = app;
