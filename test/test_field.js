'use strict';

const test = require('tape-async');
const field = require('../src/ui/field');

const Person = require('./fixtures/person');

test('render bootstrap field group without instance', function *(t) {
  const vd = field(Person.props.surname);
  const id = vd.children[1].attributes.id;
  t.deepEqual(vd, {
    attributes: { class: 'form-group' },
    children: [
      {
        attributes: {
          class: 'col-sm-2 control-label',
          for: id
        },
        children: [ 'Given' ],
        type: 'label'
      },
      {
        attributes: {
          class: 'form-control',
          id: id,
          type: 'text',
          value: 'test'
        },
        children: [],
        type: 'input'
      }
    ],
    type: 'div'
  });
});
