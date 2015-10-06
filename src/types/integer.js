'use strict';
const T = require('typed-immutable');

const Integer = (min, max, label) => {
  const digits = Math.max(String(Math.abs(min)).length, String(Math.abs(max)).length);
  const NewType = new T.Typed(`Integer(${digits})`, value => {
    if (typeof(value) !== 'number') {
      return new TypeError(`"${value}" is not a number`);
    }

    if (Math.round(value) !== value) {
      return new TypeError(`"${value}" is not integer`);
    }

    if (value > max) {
      return new TypeError(`${value} is greater than ${max}`);
    }

    if (value < min) {
      return new TypeError(`${value} is less than ${min}`);
    }

    return value;
  });

  NewType.min = min;
  NewType.max = max;
  NewType.digits = digits;
  NewType.label = label;
  return NewType;
};

module.exports = Integer;
