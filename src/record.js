'use strict';

const T = require('typed-immutable');
const humanize = require('inflection').humanize;

module.exports = function Record(props) {
  const r = new T.Record(props);
  r.props = props;
  Object.keys(r.props).forEach(key => {
    const prop = r.props[key];
    prop.label = prop.label || humanize(key);
  });
  return r;
};
