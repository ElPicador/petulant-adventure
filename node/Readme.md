### Petulant Adventure
A test for timed based data

### Prerequisite

  * nvm (https://github.com/creationix/nvm)

### Install

  * nvm install
  * npm install

### Test

  * npm test

### Run

  * npm start
    * Starts a web server on port 3000
    * Launches indexing of contents asynchronously
  * curl -v http://localhost:3000/
  * curl -v http://localhost:3000/1/queries/count/2015
  * curl -v http://localhost:3000/1/queries/popular/2015?size=3

### Comments

  * Instead of validator.js, parse.js => moment.js (http://momentjs.com)
  * Indexing in simple_searcher.js is naive, but can work with a small set of data. It uses too much memory, as each data is duplicated 6 times (one in each timeslot).
  * Caching of results could be done, but only if indexing is completed

### Libraries

  * express for http/json
  * mocha for testing
  * chai for BDD assertions
  * supertest for http/json assertions

### Improvements

  * Better validation, validate month and day format. Eg : 2015-90 pass the tests
  * Invalid multiple values of size. Eg : GET /1/queries/popular/2015?size=1&size=2