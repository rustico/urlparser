module.exports = class URLParser {
  constructor(urlFormat) {
    this.urlFormat = urlFormat;
    this.keys = {};

    urlFormat.split('/').forEach((key, i) => {
      if(key[0] == ':') {
        this.keys[i] = key.slice(1);
      } 
    });
  }

  parse(url) {
    let attribs = {};
    let [path, query] = this._initURL(url);
    this._parsePath(path, attribs);

    if(!!query) {
      this._parseQuery(query, attribs);
    }

    return attribs;
  }

  _initURL(url) {
    if(url.indexOf('://') >= 0) {
      url = url.split('://')[1];
    }

    let tmp = url.split('?'),
        path = tmp[0],
        query = '';

    if(tmp.length > 1) {
      query = tmp[1];
    }

    return [path, query];
  }

  _parsePath(path, attribs) {
    let values = path.split('/'),
        value = '',
        attrib = '';

    Object.keys(this.keys).forEach((key) => {
      let i = parseInt(key);
      if(i >= values.length) {
        value = null;
      } else {
        value = parseInt(values[i]);
        if(isNaN(value)) {
          value = values[i];
        }
      }

      attrib = this.keys[key];
      attribs[attrib] = value;
    });
  }

  _parseQuery(query, attribs) {
    let values = query.split('&'),
        key = '',
        value = '',
        tmp;

    for(let i = 0; i < values.length; i++) {
      tmp = values[i].split('=');
      key = tmp[0];
      value = parseInt(tmp[1]);
      if(isNaN(value)) {
        value = tmp[1];
      }
      attribs[key] = value;
    }
  }
}
