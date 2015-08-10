'use strict';

var REGEXP = {
	YEAR: /^(\d+)$/,
	YEAR_AND_MONTH: /^(\d+)-(\d\d?)$/,
	FULL_DATE: /^(\d+)-(\d\d?)-(\d\d?)$/,
	YEAR_MONTH_DAY_AND_HOUR: /^(\d+)-(\d\d?)-(\d\d?) (\d\d?)$/,
	YEAR_MONTH_DAY_HOUR_AND_MINUTE: /^(\d+)-(\d\d?)-(\d\d?) (\d\d?):(\d\d?)$/,
	FULL_TIMESTAMP: /^(\d+)-(\d\d?)-(\d\d?) (\d\d?):(\d\d):(\d\d)$/
}

var validate_date = function(date) {
	if(REGEXP.YEAR.test(date)) {
		return true;
	}

	if(REGEXP.YEAR_AND_MONTH.test(date)) {
		return true;
	}

	if(REGEXP.FULL_DATE.test(date)) {
		return true;
	}

	if(REGEXP.YEAR_MONTH_DAY_AND_HOUR.test(date)) {
		return true;
	}

	if(REGEXP.YEAR_MONTH_DAY_HOUR_AND_MINUTE.test(date)) {
		return true;
	}

	if(REGEXP.FULL_TIMESTAMP.test(date)) {
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