console.log('this is main.js');

var React = require('react');
console.log('main.js React', React.version);
var Hello = React.createFactory(require('./components/Hello'));
window.React = React;
React.render(Hello(), document.getElementById('Hello'));
