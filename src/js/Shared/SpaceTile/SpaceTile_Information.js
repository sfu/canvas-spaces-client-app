'use strict';

import React from 'react';
const {PropTypes} = React;

const SpaceTile_Information = React.createClass({

  propTypes: {
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    is_leader: PropTypes.bool.isRequired
  },

  render() {

    function truncate_description(str) {
      if (str.length < 140) { return str; }
      return `${str.substr(0, 100).trim()}…`;
    }

    const edit_button = this.props.is_leader ? (
      <button
        className="SpaceTile--SpaceInformation-editButton Button Button--small"
        onClick={this.props.editButtonHandler}
      >
        <i className="icon-settings"></i>
        Change Space Settings
      </button>
    ) : '';

    const leader_text = this.props.is_leader ? (
      <p className="SpaceTile--SpaceInformation-leaderNote">
        You are the leader of this space.
      </p>
    ) : '';

    return (
      <div className="SpaceTile--SpaceInformation">
        <h1>{this.props.name}</h1>
        <h2 title={this.props.description}>{this.props.description}</h2>
        {edit_button}
        {leader_text}
      </div>
    );
  }

});

export default SpaceTile_Information;
