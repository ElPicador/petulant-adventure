'use strict';

var REGEXP = require('./validator').REGEXP;

//size is already valid
var parse_size = function(size) {
	return parseInt(size, 10);
};

var parse_date = function(date) {
	if(REGEXP.YEAR.test(date)) {
		return {
			year: parseInt(REGEXP.YEAR.exec(date)[1], 10)
		};
	}

	if(REGEXP.YEAR_AND_MONTH.test(date)) {
		var result = REGEXP.YEAR_AND_MONTH.exec(date);
		return {
			year: parseInt(result[1], 10),
			month: parseInt(result[2], 10)
		}
	}

	if(REGEXP.FULL_DATE.test(date)) {
		var result = REGEXP.FULL_DATE.exec(date);
		return {
			year: parseInt(result[1], 10),
			month: parseInt(result[2], 10),
			day: parseInt(result[3], 10)
		}
	}

	if(REGEXP.YEAR_MONTH_DAY_AND_HOUR.test(date)) {
		var result = REGEXP.YEAR_MONTH_DAY_AND_HOUR.exec(date);
		return {
			year: parseInt(result[1], 10),
			month: parseInt(result[2], 10),
			day: parseInt(result[3], 10),
			hour: parseInt(result[4], 10)
		}
	}

	if(REGEXP.YEAR_MONTH_DAY_HOUR_AND_MINUTE.test(date)) {
		var result = REGEXP.YEAR_MONTH_DAY_HOUR_AND_MINUTE.exec(date);
		return {
			year: parseInt(result[1], 10),
			month: parseInt(result[2], 10),
			day: parseInt(result[3], 10),
			hour: parseInt(result[4], 10),
			minute: parseInt(result[5], 10)
		}
	}

	if(REGEXP.FULL_TIMESTAMP.test(date)) {
		var result = REGEXP.FULL_TIMESTAMP.exec(date);
		return {
			year: parseInt(result[1], 10),
			month: parseInt(result[2], 10),
			day: parseInt(result[3], 10),
			hour: parseInt(result[4], 10),
			minute: parseInt(result[5], 10),
			second: parseInt(result[6], 10)
		}
	}
};

module.exports = {
	date: parse_date,
	size: parse_size
};
