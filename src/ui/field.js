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

  Integer: (prop, id) => element('input', {
    name: prop.key,
    id: id,
    type: 'number',
    value: '0',
    // maxlength: String(prop.digits + (prop.min < 0 ? 1 : 0)),
    class: theme.field
  })
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
