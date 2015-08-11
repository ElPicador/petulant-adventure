'use strict';

var express = require('express'),
  validator = require('./validator'),
  parse = require('./parse'),
  simple = require('./simple')

var create_app = function(file) {
  simple.index(file);

  var app = express();

  app.get('/', function (req, res) {
    res.json({hello: 'world'});
  });

  app.get('/1/queries/count/:date', function(req, res) {
    if(!validator.date(req.params.date)) {
      return res.status(400).json({message: 'Date is not valid. Accepting YYYY, YYYY-MM, YYYY-MM-dd, YYYY-MM-dd HH, YYYY-MM-dd HH:mm or YYYY-MM-dd HH:mm:ss'});
    }

    if(req.query.size && !validator.size(req.query.size)) {
     return res.status(400).json({message: 'Size is not valid. Accepting integers only'});
    }

    var date = parse.date(req.params.date);
    var size = parse.size(req.query.size);

    if(!req.query.size) {
      var count = simple.count(date);
      if(count && count !== 0) {
        res.json({count: simple.count(date)});
      } else {
        res.status(404).json({});
      }
    } else {
      var top = simple.top(date, size);
      if(top && top.length) {
        res.json({queries: top});
      } else {
        res.status(404).json({});
      }
    }
  });

  return app;
}

module.exports = create_app