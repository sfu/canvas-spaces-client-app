define(function(require) {
  const React = require('react');
  const World = require('jsx!components/World');
  const Hello = React.createClass({
    divstyle: {
      padding: '50px',
    },

    render() {
      return (
        <div style={this.divstyle}>
          <h1>Canvas Spaces</h1>
          <p>Hello <World /></p>
        </div>
      );
    }
  });
  return Hello;
});