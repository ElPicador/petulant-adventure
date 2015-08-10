'use strict';

var REGEXP = {
	YEAR: /^(\d+)$/,
	YEAR_AND_MONTH: /^(\d+)-(\d\d?)$/,
	FULL_DATE: /^(\d+)-(\d\d?)-(\d\d?)$/
}

var validate_date = function(date) {
	if(REGEXP.YEAR.test(date)) { //only year
		return true;
	}

	if(REGEXP.YEAR_AND_MONTH.test(date)) { //year & month
		return true;
	}

	if(REGEXP.FULL_DATE.test(date)) { //year & month & day
		return true;
	}

	return false;
};

var validate_size = function(size) {
	return /^\d+$/.test(size);
};

module.exports = {
	REGEXP: REGEXP,
	date: validate_date,
	size: validate_size
};