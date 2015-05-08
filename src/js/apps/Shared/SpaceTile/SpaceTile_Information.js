'use strict';

import React from 'react';
const {PropTypes} = React;

const SpaceTile_Information = React.createClass({

  propTypes: {
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    is_leader: PropTypes.bool.isRequired
  },

  onClick(e) {
    e.preventDefault();
  },

  render() {

    function truncate_description(str) {
      if (str.length < 140) { return str; }
      return `${str.substr(0, 100).trim()}…`;
    }

    const edit_button = this.props.is_leader ? (
      <button
        className="Button Button--small"
        onClick={this.onClick}
      >
        <i className="icon-settings"></i>
        Edit this space
      </button>
    ) : '';

    const leader_text = this.props.is_leader ? (<p className="SpaceTile--SpaceInformation-leaderNote">You are the leader of this space</p>) : '';
    return (
      <div className="SpaceTile--SpaceInformation">
        <h1>{this.props.name}</h1>
        {leader_text}
        <h2 title={this.props.description}>{this.props.description}</h2>
        {edit_button}
      </div>
    );
  }

});

export default SpaceTile_Information;
