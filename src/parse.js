'use strict';

var REGEXP = require('./validator').REGEXP;

//size is already valid
var parse_size = function(size) {
  return parseInt(size, 10);
};

var parse_date = function(date) {
  if(REGEXP.YEAR.test(date)) { //only year
    return {
      year: parseInt(REGEXP.YEAR.exec(date)[1], 10)
    };
  }

  if(REGEXP.YEAR_AND_MONTH.test(date)) { //year & month
    var result = REGEXP.YEAR_AND_MONTH.exec(date);
    return {
      year: parseInt(result[1], 10),
      month: parseInt(result[2], 10)
    }
  }

  if(REGEXP.FULL_DATE.test(date)) { //year & month & day
    var result = REGEXP.FULL_DATE.exec(date);
    return {
      year: parseInt(result[1], 10),
      month: parseInt(result[2], 10),
      day: parseInt(result[3], 10)
    }
  }
};

module.exports = {
  date: parse_date,
  size: parse_size
};
