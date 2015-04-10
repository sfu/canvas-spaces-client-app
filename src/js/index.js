import React from 'react';

if (__DEV__) {
  require('../scss/main.scss');
  window.React = window.React || React;
  console.log('React: ', React.version);
}
