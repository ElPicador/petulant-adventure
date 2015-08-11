'use strict';

var server = require('../src/app.js'),
    request = require('supertest')

describe('integration tests', function() {

  var app;

  before(function() {
    app = server('./test/data.tsv');
  });

  describe('/', function() {
    it('answers hello world JSON', function(done) {
      request(app)
        .get('/')
        .expect('Content-Type', /json/)
        .expect(200, {hello: 'world'}, done);
    });
  });

  describe('/1/queries/count/DATE', function() {

    it('answers JSON', function(done) {
      request(app)
        .get('/1/queries/count/2015')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });

    it('400 if invalid date', function(done) {
      request(app)
        .get('/1/queries/count/date')
        .expect(400, done);
    });

  });


  describe('/1/queries/count/DATE?size=SIZE', function() {

    it('answers JSON', function(done) {
      request(app)
        .get('/1/queries/count/2015?size=1')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });

    it('400 if invalid size', function(done) {
      request(app)
        .get('/1/queries/count/2015?size=SIZE')
        .expect(400, done);
    });

  });

});