define(function (require) {
  console.log('this is main.js');
  // we can require react here
  // doing so also makes window.React availble
  // (from vendor/canvas/public/javascripts/react.js)
  // but we shouldn't rely on it.
  var React = require('react');
  var Hello = React.createFactory(require('jsx!components/Hello'));
  React.render(Hello(), document.getElementById('Hello'));
});
