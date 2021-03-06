'use strict';

var React = require('react');
var TodoApp = require('./jsx/todo_app.jsx');

var containerEl = window.document.getElementById('react-container');
if (containerEl) {
  React.render(<TodoApp />, containerEl);
}
