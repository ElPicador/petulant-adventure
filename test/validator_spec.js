'use strict';

var expect = require('chai').expect

var validator = require('../src/validator');

describe('validator', function() {

	describe('date', function() {

		describe('year', function() {

			it('valid year', function() {
				expect(validator.date('2015')).to.be.true;
			});

			it('invalid year', function() {
				expect(validator.date('year')).to.be.false;
			});

		});

		describe('year & month', function() {

			it('valid year & month', function() {
				expect(validator.date('2015-08')).to.be.true;
			});

			it('invalid year & valid month', function() {
				expect(validator.date('date-08')).to.be.false;
			});

			it('invalid year & invalid month', function() {
				expect(validator.date('year-month')).to.be.false;
			});

		});

		describe('year & month & day', function() {

			it('valid year & month & day', function() {

			});

			it('invalid year & invalid month', function() {
				expect(validator.date('year-month')).to.be.false;
			});

		});

	});

	describe('size', function() {

		it('valid size', function() {
			expect(validator.size('01')).to.be.true;
		});

		it('invalid size', function() {
			expect(validator.size('size')).to.be.false;
		});

	});

});
