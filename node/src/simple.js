'use strict'

var fs = require('fs'),
  readline = require('readline'),
  Stream = require('stream'),
  parse = require('./parse');

var big_map = {
  year: {},
  month: {},
  day: {},
  hour: {},
  minute: {},
  second: {},
};

var count = function(date) {
  if(date.hasOwnProperty('second')) {
    if(big_map.second[date.second]) {
      return Object.keys(big_map.second[date.second]).length;
    }
    return;
  }

  if(date.hasOwnProperty('minute')) {
    if(big_map.minute[date.minute]) {
      return Object.keys(big_map.minute[date.minute]).length;
    }
    return;
  }

  if(date.hasOwnProperty('hour')) {
    if(big_map.hour[date.hour]) {
      return Object.keys(big_map.hour[date.hour]).length;
    }
    return;
  }

  if(date.hasOwnProperty('day')) {
    if(big_map.day[date.day]) {
      return Object.keys(big_map.day[date.day]).length;
    }
    return;
  }

  if(date.hasOwnProperty('month')) {
    if(big_map.month[date.month]) {
      return Object.keys(big_map.month[date.month]).length;
    }
    return;
  }

  if(date.hasOwnProperty('year') && big_map.year[date.year]) {
    return Object.keys(big_map.year[date.year]).length;
  }

  return;
}

var top = function(date, size) {
  return [{}];
}

var index = function(file) {
  var instream = fs.createReadStream(file);
  var outstream = new Stream;
  outstream.readable = true;
  outstream.writable = true;

  var stream = readline.createInterface({
    input: instream,
    output: outstream,
    terminal: false
  });

  var number_line_processed = 0;

  stream.on('line', function(line) {
    if(line) {
      var columns = line.split('\t');
      var date = parse.date(columns[0]);
      var search = columns[1];

      Object.keys(date).forEach(function(key) {
        big_map[key][date[key]] = big_map[key][date[key]] || {};
        big_map[key][date[key]][search] = big_map[key][date[key]][search] || 1;
        big_map[key][date[key]][search] += 1;
      });
    }

    if(number_line_processed % 100000 == 0) {
      console.log('Done indexing', number_line_processed, 'lines');
    }

    number_line_processed++;
  });

  stream.on('error', function() {
    console.log('Error while indexing', err);
  });

  stream.on('close', function() {
    console.log('Done indexing');
  });
};

module.exports = {
  index: index,
  count: count,
  top: top
}