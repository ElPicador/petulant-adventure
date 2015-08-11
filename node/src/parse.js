'use strict';

var REGEXP = require('./validator').REGEXP;

//size is already valid
var parse_size = function(size) {
	return parseInt(size, 10);
};

var _pad2_and_parse = function(val) {
	return ('00' + parseInt(val, 10)).slice(-2);
}

//date is already valid
var parse_date = function(date) {
	var regexp_exec = REGEXP.FULL_TIMESTAMP.exec(date);

	var result = {
		year: '' + parseInt(regexp_exec[1], 10) //date is valid, so at least a year
	}

	if(regexp_exec[2]) {
		result.month = result.year + '-' + _pad2_and_parse(regexp_exec[2]);
	}

	if(regexp_exec[3]) {
		result.day = result.month + '-' + _pad2_and_parse(regexp_exec[3]);
	}

	if(regexp_exec[4]) {
		result.hour = result.day + ' ' + _pad2_and_parse(regexp_exec[4]);
	}

	if(regexp_exec[5]) {
		result.minute = result.hour + ':' + _pad2_and_parse(regexp_exec[5]);
	}

	if(regexp_exec[6]) {
		result.second = result.minute + ':' + _pad2_and_parse(regexp_exec[6]);
	}

	return result;
};

module.exports = {
	date: parse_date,
	size: parse_size
};
