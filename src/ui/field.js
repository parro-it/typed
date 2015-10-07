'use strict';

const uuid = require('node-uuid');
const element = require('virtual-element');
const theme = require('./bootstrap-theme');


const fields = {
  Text: (prop, id) => element('input', {
    name: prop.key,
    id: id,
    type: 'text',
    value: 'test',
    maxlength: String(prop.size),
    class: theme.field
  }),

  Integer: (prop, id) => {
    const length = prop.digits + (prop.min < 0 ? 1 : 0);
    return element('input', {
      name: prop.key,
      id: id,
      type: 'text',
      value: '0',
      class: theme.field,
      onInput(e) {
        let v = e.target.value;

        if (v > prop.max) {
          v = String(prop.max);
        }

        if (v < prop.min) {
          v = String(prop.min);
        }


        v = v.replace(/[^\d|\-]/g, '');

        v = v.slice(0, length);

        if (prop.min >= 0) {
          v = v.replace(/\-/g, '');
        }

        if (v !== e.target.value) {
          e.target.value = v;
        }
      }
    });
  }
};

const field = (prop) => {
  const id = uuid.v4().replace(/-/g, '');
  return element('div', {class: theme.group}, [
    element('label', {for: id, class: theme.label}, [prop.label]),
    element('div', {class: theme.fieldWrapper}, [
      fields[prop.type](prop, id)
    ])
  ]);
};

module.exports = field;
