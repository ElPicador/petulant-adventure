### Petulant Adventure
A test for timed based data

### Prerequisite

  * nvm (https://github.com/creationix/nvm)

### Init

  * nvm install
  * npm install

### Testing

  * npm test

### Running

  * npm start

### Comments

  * Instead of validator.js, parse.js => moment.js (http://momentjs.com)
  * Indexing of simple.js is naive, but can work with a small set of data. Indexing could be speed up with async loading of file & by straming the content, instead of reading it all

### Libs

  * express for http/json
  * mocha for testing
  * chai for BDD assertions
  * supertest for http/json assertions

### TODO

  * Better validation, validate month and day format. Eg : 2015-90 pass the tests
  * Multiple values of size. Eg : GET /1/queries/count/2015?size=1&size=2