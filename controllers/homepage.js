const fs = require('fs/promises');
const DBClient = require('../db/db-client');
const util = require('util');

module.exports = async function homepageController(req, res) {
  res.statusCode = 200;
  const files = ['layout', 'todo-list', 'todo-item'];
  for (let i = 0; i < files.length; i++) {
    files[i] = await fs.readFile(`./views/${files[i]}.html`);
    files[i] = files[i].toString();
  }
  let [layout, todoList, todoItem] = files;

  await DBClient.connect();

  const todos = await DBClient.todosCollection().find({}).toArray();

  if (todos.length) {
    layout = layout.replace(/{{children}}/g, todoList);
    let items = '';
    for (let todo of todos) {
      items += todoItem.replace(/({{title}})|({{description}})/g, (matched) => {
        return todo[matched.slice(2, -2)];
      });
    }
    layout = layout.replace(/{{children}}/g, items);
  } else {
    layout = layout.replace(/{{children}}/g, '');
  }

  res.end(layout);
};
