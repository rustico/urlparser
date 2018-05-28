## url parser

#### installation
```
$ npm install
```

#### tests
```
$ node tests.js
```

#### example
```
const URLParser = require('./urlParser');
let url = '/:version/api/:collecton/:id';
let urlParser = new URLParser(url);
let attribs = urlParser.parse('http://www.test.com/6/api/listings/3?sort=desc&limit=10');
console.log(attribs);
> 
{ version: 6,
  collecton: 'listings',
  id: 3,
  sort: 'desc',
  limit: 10 }
```
