'use strict';

import React from 'react';
const {PropTypes} = React;

import SpaceTile_Information from './SpaceTile_Information';
import SpaceTile_Avatar from './SpaceTile_Avatar';

const SpaceTile = React.createClass({

  propTypes: {
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    is_leader: PropTypes.bool.isRequired,
    avatar: PropTypes.string,
    space_id: PropTypes.number.isRequired
  },

  render() {
    var space_url = `/groups/${this.props.space_id}`;
    if (__DEV__) {
      space_url = `http://canvas.dev${space_url}`;
    }

    return (
      <a href={space_url}>
        <div className="SpaceTile--Container">
          <SpaceTile_Information
            name={this.props.name}
            description={this.props.description}
            is_leader={this.props.is_leader}
          />
          <SpaceTile_Avatar
            avatar={this.props.avatar}
          />
        </div>
      </a>
    );
  }

});

export default SpaceTile;
