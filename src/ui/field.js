'use strict';

const uuid = require('node-uuid');
const element = require('virtual-element');
const fields = {
  Text: prop => element('input', {
    name: prop.name,
    id: prop.id,
    type: 'text',
    value: 'test',
    maxlength: String(prop.size),
    class: 'form-control'
  }),

  Integer: prop => element('input', {
    name: prop.name,
    id: prop.id,
    type: 'number',
    value: '0',
    maxlength: String(prop.digits + (prop.min < 0 ? 1 : 0)),
    class: 'form-control'
  })
};

const field = (prop) => {
  const id = uuid.v4().replace(/-/g, '');
  return element('div', {class: 'form-group'}, [
    element('label', {for: id, class: 'col-sm-3 control-label'}, [prop.label]),
    element('div', {class: 'col-sm-9'}, [
      fields[prop.type](prop)
    ])
  ]);
};

module.exports = field;
