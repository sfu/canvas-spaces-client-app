define(function(require) {
  const React = require('react');
  const World = React.createClass({

    divstyle: {
      padding: '50px',
    },

    render() {
      return (
        <span>World!</span>
      );
    }
  });
  return World;
});