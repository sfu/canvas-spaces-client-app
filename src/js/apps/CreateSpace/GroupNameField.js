import React from 'react';
const Link = require('react-router').Link;

const GroupNameField = React.createClass({

  getInitialState() {
    return {
      can_proceed: false
    };
  },

  checkForDuplicateGroupName(evt) {
    console.log('checkForDuplicateGroupName');
    var group_name = this.refs.group_name.getDOMNode().value;
    this.setState({
      can_proceed: Boolean(group_name.length)
    });
  },

  render() {
    console.log(this.state);
    console.log(this.props);
    return (
      <div>
        <label forName="group_name">Group Name</label>:&nbsp;
        <input onKeyUp={this.checkForDuplicateGroupName} style={{'width': '300px'}} type="text" placeholder="Enter a name for your group" ref="group_name" autoFocus="true" defaultValue={this.props.data.group_name} />
        <Link className="btn" disabled={!this.state.can_proceed} to="create_space_form" params={{step: 2}}>Continue</Link><br/>
      </div>
    );
  }

});

export default GroupNameField;