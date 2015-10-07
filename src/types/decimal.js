'use strict';
const T = require('typed-immutable');

const Decimal = (min, max, fractionalDigits, label) => {
  const digits = fractionalDigits + Math.max(
    String(Math.round(Math.abs(min))).length,
    String(Math.round(Math.abs(max))).length
  );

  const NewType = new T.Typed(`Integer(${digits})`, value => {
    if (typeof(value) !== 'number') {
      return new TypeError(`"${value}" is not a number`);
    }

    if (String(value).includes('.') && String(value).split('.')[1].length > fractionalDigits) {
      return new TypeError(`${value} has more than ${fractionalDigits} fractional digits`);
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
  NewType.fractionalDigits = fractionalDigits;
  NewType.label = label;
  NewType.type = 'Decimal';

  return NewType;
};

module.exports = Decimal;
