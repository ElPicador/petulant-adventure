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
    * Launch indexing of contents asynchronously
  * curl -v http://localhost:3000/

### Comments

  * Instead of validator.js, parse.js => moment.js (http://momentjs.com)
  * Indexing of simple_searcher.js is naive, but can work with a small set of data.

### Libraries

  * express for http/json
  * mocha for testing
  * chai for BDD assertions
  * supertest for http/json assertions

### Improvements

  * Better validation, validate month and day format. Eg : 2015-90 pass the tests
  * Invalid multiple values of size. Eg : GET /1/queries/popular/2015?size=1&size=2