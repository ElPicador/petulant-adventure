'use strict';

var express = require('express'),
  validator = require('./validator'),
  parse = require('./parse'),
  searcher = require('./simple_searcher');

var create_app = function(file, done) {
  var app = express();

  app.get('/', function (req, res) {
    console.log('Memory', process.memoryUsage());
    res.json({hello: 'world'});
  });

  app.get('/1/queries/count/:date', function(req, res) {
    if(!validator.date(req.params.date)) {
      return res.status(400).json({message: 'Date is not valid. Accepting YYYY, YYYY-MM, YYYY-MM-dd, YYYY-MM-dd HH, YYYY-MM-dd HH:mm or YYYY-MM-dd HH:mm:ss'});
    }

    var date = parse.date(req.params.date);
    var count = searcher.count(date);

    if(count && count !== 0) {
      res.json({count: searcher.count(date)});
    } else {
      res.status(404).json({});
    }
  });

  app.get('/1/queries/popular/:date', function(req, res) {
    if(!validator.date(req.params.date)) {
      return res.status(400).json({message: 'Date is not valid. Accepting YYYY, YYYY-MM, YYYY-MM-dd, YYYY-MM-dd HH, YYYY-MM-dd HH:mm or YYYY-MM-dd HH:mm:ss'});
    }

    if(req.query.size && !validator.size(req.query.size)) {
     return res.status(400).json({message: 'Size is not valid. Accepting integers only'});
    }

    var date = parse.date(req.params.date);
    var size = parse.size(req.query.size);
    var popular = searcher.popular(date, size);

    if(popular && popular.length) {
      res.json({queries: popular});
    } else {
      res.status(404).json({});
    }
  });

  searcher.index(file, done);

  return app;
};

module.exports = create_app;