'use strict';

var expect = require('chai').expect;

var searcher = require('../src/simple_searcher');

describe('simple searcher', function() {

  describe('index one day', function() {

    before(function(done) {
      searcher.index('./test/data/one_day.tsv', done);
    });

    it('index year', function() {
      expect(searcher._BIG_MAP.year).to.have.key('2015');
      expect(searcher._BIG_MAP.year['2015']).to.be.deep.equal({request: 1});
    });

    it('index day', function() {
      expect(searcher._BIG_MAP.day).to.have.key('2015-08-01');
      expect(searcher._BIG_MAP.day['2015-08-01']).to.be.deep.equal({request: 1});
    });

  });

  describe('index two days', function() {

    before(function(done) {
      searcher.index('./test/data/two_days.tsv', done);
    });

    it('index year', function() {
      expect(searcher._BIG_MAP.year).to.have.key('2015');
      expect(searcher._BIG_MAP.year['2015']).to.be.deep.equal({request: 2});
    });

    it('index day', function() {
      expect(searcher._BIG_MAP.day).to.have.keys('2015-08-01', '2015-08-02');
      expect(searcher._BIG_MAP.day['2015-08-01']).to.be.deep.equal({request: 1});
    });

  });

  describe('count', function() {

    before(function(done) {
      searcher.index('./test/data/count.tsv', done);
    });

    it('year', function() {
      expect(searcher.count({ year: '2015' })).to.be.equal(3);
    });

    it('month', function() {
      expect(searcher.count({ month: '2015-08' })).to.be.equal(3);
    });

    it('day', function() {
      expect(searcher.count({ day: '2015-08-01'} )).to.be.equal(2);
    });

  });

  describe('popular', function() {

    before(function(done) {
      searcher.index('./test/data/popular.tsv', done);
    });

    it('year, 1', function() {
      expect(searcher.popular({ year: '2015' }, 1)).to.be.deep.equal([{ query: 'request1', count: 3 }]);
    });

    it('year, 2', function() {
      expect(searcher.popular({ year: '2015' }, 2)).to.be.deep.equal([{ query: 'request1', count: 3 }, { query: 'request2', count: 2 }]);
    });

    it('month', function() {
      expect(searcher.popular({ month: '2015-08' }, 1)).to.be.deep.equal([ { query: 'request1', count: 3 } ]);
    });

    it('day', function() {
      expect(searcher.popular({ day: '2015-08-01'}, 1)).to.be.deep.equal([ { query: 'request1', count: 1 } ]);
    });

  });

});
