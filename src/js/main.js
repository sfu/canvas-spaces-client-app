console.log('this is main.js');

var React = require('canvas/react');
console.log('main.js React', React.version);
var Hello = React.createFactory(require('./components/Hello'));
console.log(Hello);
React.render(Hello(), document.getElementById('Hello'));
