'use strict';

const uuid = require('node-uuid');
const element = require('virtual-element');

const field = (prop) => {
  const id = uuid.v4().replace(/-/g, '');
  return element('div', {class:"form-group"}, [
    element('label', {for: id, class:'col-sm-2 control-label'}, [prop.label]),
    element('input', { id: id, type:"text", value:'test', class:'form-control' })
  ]);
}

module.exports = field;
