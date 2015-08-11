'use strict';

var expect = require('chai').expect;

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

			it('valid', function() {
				expect(validator.date('2015-08')).to.be.true;
			});

			it('invalid', function() {
				expect(validator.date('2015-month')).to.be.false;
			});

		});

		describe('year & month & day', function() {

			it('valid', function() {
				expect(validator.date('2015-08-19')).to.be.true;
			});

			it('invalid', function() {
				expect(validator.date('2015-08-month')).to.be.false;
			});

		});

		describe('year & month & day & hour', function() {

			it('valid', function() {
				expect(validator.date('2015-08-19 10')).to.be.true;
			});

			it('invalid', function() {
				expect(validator.date('2015-08-19 hour')).to.be.false;
			});

		});

		describe('year & month & day & hour & minute', function() {

			it('valid', function() {
				expect(validator.date('2015-08-19 10:01')).to.be.true;
			});

			it('invalid', function() {
				expect(validator.date('2015-08-19 10:minute')).to.be.false;
			});

		});

		describe('year & month & day & hour & minute & second', function() {

			it('valid', function() {
				expect(validator.date('2015-08-19 10:01:56')).to.be.true;
			});

			it('invalid', function() {
				expect(validator.date('2015-08-19 10:01:second')).to.be.false;
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
