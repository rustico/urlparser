const test = require('tape');
const UrlParser = require('./urlParser');

test('without query string', function (t) {
  t.plan(3);
  let url = '/:version/api/:collection/:id';
  let urlParser = new UrlParser(url);
  let attribs = urlParser.parse('http://www.test.com/6/api/listings/3');
  t.equal(attribs['version'], 6);
  t.equal(attribs['collection'], 'listings');
  t.equal(attribs['id'], 3);
});

test('with query string', function (t) {
  t.plan(5);
  let url = '/:version/api/:collection/:id';
  let urlParser = new UrlParser(url);
  let attribs = urlParser.parse('http://www.test.com/6/api/listings/3?sort=desc&limit=10');
  t.equal(attribs['version'], 6);
  t.equal(attribs['collection'], 'listings');
  t.equal(attribs['id'], 3);
  t.equal(attribs['sort'], 'desc');
  t.equal(attribs['limit'], 10);
});

test('without protocol and query string', function (t) {
  t.plan(5);
  let url = '/:version/api/:collection/:id';
  let urlParser = new UrlParser(url);
  let attribs = urlParser.parse('www.test.com/6/api/listings/3?sort=desc&limit=10');
  t.equal(attribs['version'], 6);
  t.equal(attribs['collection'], 'listings');
  t.equal(attribs['id'], 3);
  t.equal(attribs['sort'], 'desc');
  t.equal(attribs['limit'], 10);
});

test('without domain and query string', function (t) {
  t.plan(5);
  let url = '/:version/api/:collection/:id';
  let urlParser = new UrlParser(url);
  let attribs = urlParser.parse('/6/api/listings/3?sort=desc&limit=10');
  t.equal(attribs['version'], 6);
  t.equal(attribs['collection'], 'listings');
  t.equal(attribs['id'], 3);
  t.equal(attribs['sort'], 'desc');
  t.equal(attribs['limit'], 10);
});

test('another example with query string', function (t) {
  t.plan(6);
  let url = '/test/test/:version/api/:collection/:id/:test3/test4';
  let urlParser = new UrlParser(url);
  let attribs = urlParser.parse('http://www.test.com/test/test/6/api/listings/3/test3?sort=desc&limit=10');
  t.equal(attribs['version'], 6);
  t.equal(attribs['collection'], 'listings');
  t.equal(attribs['id'], 3);
  t.equal(attribs['test3'], 'test3');
  t.equal(attribs['sort'], 'desc');
  t.equal(attribs['limit'], 10);
});

test('another example with last parameter optional', function (t) {
  t.plan(3);
  let url = '/:version/api/:collection/:id';
  let urlParser = new UrlParser(url);
  let attribs = urlParser.parse('/6/api/listings');
  t.equal(attribs['version'], 6);
  t.equal(attribs['collection'], 'listings');
  t.equal(attribs['id'], null);
});

test('another example with missing values', function (t) {
  t.plan(3);
  let url = '/:version/api/:collection/test/:id';
  let urlParser = new UrlParser(url);
  let attribs = urlParser.parse('http://www.test.com/6/test');
  t.equal(attribs['version'], 6);
  t.equal(attribs['collection'], null);
  t.equal(attribs['id'], null);
});
