const React = require('react');
const World = require('./World');
const Hello = React.createClass({
  divstyle: {
    padding: '50px',
  },

  render() {
    return (
      <div className="selector_that_should_not_appear_anywhere_else"style={this.divstyle}>
        <h1>Canvas Spaces</h1>
        <p>Hello <World /></p>
      </div>
    );
  }
});
module.exports = Hello;