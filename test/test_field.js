'use strict';

const test = require('tape-async');
const field = require('../src/ui/field');
const element = require('virtual-element');
const deku = require('deku');
const fs = require('fs');
const Person = require('./fixtures/person');
const insertCss = require('insert-css');

const createForm = () => deku.tree(
  element('form', {class: 'form-horizontal'}, [
    field(Person.props.surname),
    field(Person.props.name),
    field(Person.props.age)
  ])
);

if (global.collider) {
  global.createField = () => {
    const app = createForm();
    const bootstrap = fs.readFileSync(`${__dirname}/../node_modules/bootstrap/dist/css/bootstrap.css`);
    insertCss(bootstrap);
    document.body.innerHTML = `
    <div class="container-fluid">
      <div class="row">
        <main class="col-md-3 col-md-offset-3">
        </main>
      </div>
    </div>`;
    setTimeout(() => {
      deku.render(app, document.body.querySelector('main'));
    });

    global.collider.open();
  };
}

test('render bootstrap field group without instance', function *(t) {
  const vd = field(Person.props.surname);
  const id = vd.children[1].children[0].attributes.id;
  t.deepEqual(vd, {
    attributes: { class: 'form-group' },
    children: [
      {
        attributes: {
          class: 'col-sm-3 control-label',
          for: id
        },
        children: [ 'Given' ],
        type: 'label'
      },
      {
        attributes: { class: 'col-sm-9' },
        children: [
          {
            attributes: {
              name: 'surname',
              class: 'form-control',
              id: id,
              type: 'text',
              value: 'test',
              maxlength: '5',
            },
            children: [],
            type: 'input'
          }
        ],
        type: 'div'
      }
    ],
    type: 'div'
  });
});

test('render valid html', function *(t) {
  const app = createForm();
  const html = deku.renderString(app)
    .replace(/for=\"[a-z0-9]+\"/g, 'for="$id"')
    .replace(/id=\"[a-z0-9]+\"/g, 'id="$id"');

  t.equal(html,
`<form class="form-horizontal">
  <div class="form-group">
    <label for="$id" class="col-sm-3 control-label">Given</label>
    <div class="col-sm-9">
      <input name="surname" id="$id" type="text" value="test" maxlength="5" class="form-control">
      </input>
    </div>
  </div>
  <div class="form-group">
    <label for="$id" class="col-sm-3 control-label">Name</label>
    <div class="col-sm-9">
      <input name="name" id="$id" type="text" value="test" maxlength="5" class="form-control">
      </input>
    </div>
  </div>
  <div class="form-group">
    <label for="$id" class="col-sm-3 control-label">Age</label>
    <div class="col-sm-9">
      <input name="age" id="$id" type="number" value="0" class="form-control">
      </input>
    </div>
  </div>
</form>`.replace(/\n */g, ''));
});


