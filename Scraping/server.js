var express = require('express');
var app = express();
var morgan = require('morgan');
var cheerio = require('cheerio');
var request = require('request');
var fs = require('fs');

app.get('/scrape',function(req,res) {
  // res.send('This is the demo page to scrape the web');

  url = 'http://www.imdb.com/title/tt3417422/?pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=2681270342&pf_rd_r=150YB6DTA9MWACRX7A1Z&pf_rd_s=center-4&pf_rd_t=64301&pf_rd_i=top-rated-indian-movies&ref_=in_india_ss_toprated_tt_2';
  request(url,function(error,response,html) {
    if(!error) {
      var $ = cheerio.load(html);

      var title,release,rating;
      var json = {title : "",release:"",rating:""};

      $('.title_wrapper').filter(function() {
        var data = $(this);
        title = data.children().first().text();
        release  = data.children().first().last().children().text();
        json.title = title;
        json.release = release;
      })

      $('.star-box-giga-star').filter(function() {
        var data = $(this);
        rating = data.text();
        json.rating = rating;
      })
    }

    fs.writeFile('outputjson',JSON.stringify(json,null,4),function(err) {
      console.log('File saved successfully!');
    })
    res.send('Check your console!');
  });
})

app.listen('8081');

console.log('The server has started...');
exports = module.exports = app;
