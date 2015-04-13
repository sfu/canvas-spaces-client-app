import React from 'react';


import $ from 'jquery';
$('h1').addClass('foo');

if (__DEV__) {
  require('../scss/main.scss');
  window.React = window.React || React;
  console.log('React: ', React.version);
  // console.log('jQuery:', $.fn.jquery);
}
