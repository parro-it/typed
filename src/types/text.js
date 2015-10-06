'use strict';
const T = require("typed-immutable")

const Text = (size, label) => {
  const NewType = T.Typed(`Text(${size})`, value => {
    if (typeof(value) !== 'string') {
      return TypeError(`"${value}" is not a string`);
    }

    if (value.size > size) {
      return TypeError(`"${value}" length is greater than ${size}`);
    }

    return value;
  });

  NewType.size = size;
  NewType.label = label;
  return NewType;
};

module.exports = Text;
