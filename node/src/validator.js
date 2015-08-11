'use strict';

var REGEXP = {
	FULL_TIMESTAMP: /^(\d+)-?(\d\d?)?-?(\d\d?)? ?(\d\d?)?:?(\d\d)?:?(\d\d)?$/
}

var validate_date = function(date) {
	return REGEXP.FULL_TIMESTAMP.test(date);
};

var validate_size = function(size) {
	return /^\d+$/.test(size);
};

module.exports = {
	REGEXP: REGEXP,
	date: validate_date,
	size: validate_size
};