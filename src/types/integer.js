'use strict';
const T = require("typed-immutable")


const Integer = (digits, label) => {
  const NewType = T.Typed(`Integer(${digits})`, value => {
    if (typeof(value) !== 'number') {
      return TypeError(`"${value}" is not a number`);
    }

    if (Math.round(value) !== value) {
      return TypeError(`"${value}" is not integer`);
    }

    if (String(value).length > digits) {
      return TypeError(`"${value}" has more than ${digits} digits`);
    }

    return value;
  });

  NewType.digits = digits;
  NewType.label = label;
  return NewType;
};

module.exports = Integer;
