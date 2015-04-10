console.log('this is main.js');

if (__DEV__) {
  require('../scss/main.scss');
}

var React = require('react');
console.log('main.js React', React.version);
var Hello = React.createFactory(require('./components/Hello'));
window.React = React;
React.render(Hello(), document.getElementById('Hello'));
