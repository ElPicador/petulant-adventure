'use strict';

var fs = require('fs'),
  readline = require('readline'),
  Stream = require('stream'),
  parse = require('./parse');

var TIMESLOTS = ['second', 'minute', 'hour', 'day', 'month', 'year'];
var BIG_MAP = {};

var _get_data_for_timeslot = function(date) {
  for (var i = 0; i < TIMESLOTS.length; i++) {
    if(date.hasOwnProperty(TIMESLOTS[i])) {
      var timeslot = TIMESLOTS[i];
      return BIG_MAP[timeslot][date[timeslot]];
    }
  }
};

var count = function(date) {
  var data_for_timeslot = _get_data_for_timeslot(date);
  if(data_for_timeslot) {
    return Object.keys(data_for_timeslot).length;
  }
};

var popular = function(date, size) {
  var data_for_timeslot = _get_data_for_timeslot(date) || {};

  var requests = Object.keys(data_for_timeslot);
  requests = requests.sort(function(a, b) {
    return data_for_timeslot[b] - data_for_timeslot[a];
  });

  return requests.slice(0, size).map(function(request) {
    return {
      query: request,
      count: data_for_timeslot[request]
    };
  });
};

var index = function(file, done) {
  TIMESLOTS.forEach(function(timeslot) {
    BIG_MAP[timeslot] = {};
  });

  var instream = fs.createReadStream(file);
  var outstream = new Stream();
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
        BIG_MAP[key][date[key]] = BIG_MAP[key][date[key]] || {};
        BIG_MAP[key][date[key]][search] = BIG_MAP[key][date[key]][search] || 0;
        BIG_MAP[key][date[key]][search] += 1;
      });

      if(number_line_processed % 100000 === 0) {
        console.log('Done indexing', number_line_processed, 'lines');
      }

      number_line_processed++;
    }
  });

  stream.on('error', function(err) {
    console.log('Error while indexing', err);
  });

  stream.on('close', function() {
    console.log('Done indexing');
  });

  if(done) {
    done();
  }
};

module.exports = {
  index: index,
  count: count,
  popular: popular,
  _BIG_MAP: BIG_MAP
};