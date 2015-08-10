'use strict';

var REGEXP = require('./validator').REGEXP;

//size is already valid
var parse_size = function(size) {
	return parseInt(size, 10);
};

//date is already valid
var parse_date = function(date) {
	var regexp_exec = REGEXP.FULL_TIMESTAMP.exec(date);
	var result = {
		year: parseInt(regexp_exec[1], 10) //date is valid, so at least a year
	}

	if(regexp_exec[2]) {
		result.month = parseInt(regexp_exec[2], 10);
	}

	if(regexp_exec[3]) {
		result.day = parseInt(regexp_exec[3], 10);
	}

	if(regexp_exec[4]) {
		result.hour = parseInt(regexp_exec[4], 10);
	}

	if(regexp_exec[5]) {
		result.minute = parseInt(regexp_exec[5], 10);
	}

	if(regexp_exec[6]) {
		result.second = parseInt(regexp_exec[6], 10);
	}

	return result;
};

module.exports = {
	date: parse_date,
	size: parse_size
};
