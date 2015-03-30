define(function(require) {
  const React = require('react');
  const Hello = React.createClass({

    divstyle: {
      padding: '50px',
    },

    render() {
      return (
        <div style={this.divstyle}>
          <h1>Canvas Spaces</h1>
        </div>
      );
    }
  });
  return Hello;
});