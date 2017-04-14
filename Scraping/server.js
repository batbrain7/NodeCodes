var express = require('express');
var app = express();
var morgan = require('morgan');
var cheerio = require('cheerio');
var request = require('request');
var fs = require('fs');

app.get('/scrape',function(req,res) {
  // res.send('This is the demo page to scrape the web');

  url = '';
  request(url,function(error,response,html) {
    if(!error) {
      var $ = cheerio.load(html);

      var title,release,rating;
      var json = {title : "",release:"",rating:""};

      $('.header').filter(function() {
        var data = $(this);
        title = data.children().first().text();

      })
    }
  })
});

app.listen('8081');

console.log('The server has started...');
exports = module.exports = app;
