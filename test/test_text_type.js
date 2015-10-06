'use strict';

const test = require('tape-async');
const typed = require('..');

const Person = typed.Record({

  name: typed.Text(5),
  surname: typed.Text(5,'Given')

}, 'Person');

test('Types could be instantiated', function *(t) {
  const result = new Person({name: 'c', surname:'g'});

  t.equal(result.name, 'c');
  t.equal(result.surname, 'g');
});

test('Constructors contains properties metadata', function *(t) {
  t.equal(Person.props.name.size, 5);
});

test('Constructors metadata contains properties label', function *(t) {
  t.equal(Person.props.name.label, 'Name');
});

test('Constructors metadata use custom field label if specified', function *(t) {
  t.equal(Person.props.surname.label, 'Given');
});

