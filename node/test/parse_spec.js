'use strict';

var expect = require('chai').expect,
    parse = require('../src/parse');

describe('parse', function() {

  describe('date', function() {

    it('a year', function() {
      expect(parse.date('2015')).to.be.deep.equal({year: '2015'});
    });

    it('a year and a month', function() {
      expect(parse.date('2015-08')).to.be.deep.equal({
        year: '2015',
        month: '2015-08'
      });
    });

    it('a year, a month and a day', function() {
      expect(parse.date('2015-08-01')).to.be.deep.equal({
        year: '2015',
        month: '2015-08',
        day: '2015-08-01'
      });
    });

    it('a year, a month, a day and an hour', function() {
      expect(parse.date('2015-08-01 1')).to.be.deep.equal({
        year: '2015',
        month: '2015-08',
        day: '2015-08-01',
        hour: '2015-08-01 01'
      });
    });

    it('a year, a month, a day, an hour and minutes', function() {
      expect(parse.date('2015-08-01 10:56')).to.be.deep.equal({
        year: '2015',
        month: '2015-08',
        day: '2015-08-01',
        hour: '2015-08-01 10',
        minute: '2015-08-01 10:56'
      });
    });

    it('a year, a month, a day, an hour, minutes and seconds', function() {
      expect(parse.date('2015-08-01 10:56:33')).to.be.deep.equal({
        year: '2015',
        month: '2015-08',
        day: '2015-08-01',
        hour: '2015-08-01 10',
        minute: '2015-08-01 10:56',
        second: '2015-08-01 10:56:33'
      });
    });

  });

  it('a valid size', function() {
    expect(parse.size('01')).to.equal(1);
  });

});
