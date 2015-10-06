'use strict';
const T = require('typed-immutable');

const Text = (size, label) => {
  const NewType = new T.Typed(`Text(${size})`, value => {
    if (typeof(value) !== 'string') {
      return new TypeError(`"${value}" is not a string`);
    }

    if (value.length > size) {
      return new TypeError(`"${value}" length is more than ${size} characters.`);
    }

    return value;
  });

  NewType.size = size;
  NewType.label = label;
  NewType.type = 'Text';
  return NewType;
};

module.exports = Text;
