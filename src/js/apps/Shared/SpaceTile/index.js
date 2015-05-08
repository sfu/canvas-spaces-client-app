'use strict';

import React from 'react';
const {PropTypes} = React;

import SpaceTile_Information from './SpaceTile_Information';
import SpaceTile_Avatar from './SpaceTile_Avatar';
import SpaceSettingsModal from 'apps/Shared/SpaceSettingsModal';

const SpaceTile = React.createClass({

  propTypes: {
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    is_leader: PropTypes.bool.isRequired,
    avatar: PropTypes.string,
    space_id: PropTypes.number.isRequired
  },

  getInitialState() {
    return {
      modalIsOpen: false
    };
  },

  openModal(e) {
    e.preventDefault();
    this.setState({
      modalIsOpen: true
    });
  },

  closeModal() {
    this.setState({
      modalIsOpen: false
    });
  },

  render() {
    var space_url = `/groups/${this.props.space_id}`;
    if (__DEV__) {
      space_url = `http://canvas.dev${space_url}`;
    }

    return (
      <div>
        <a href={space_url}>
          <div className="SpaceTile">
            <SpaceTile_Information
              name={this.props.name}
              description={this.props.description}
              is_leader={this.props.is_leader}
              editButtonHandler={this.openModal}
            />
            <SpaceTile_Avatar
              avatar={this.props.avatar}
            />
          </div>
        </a>
        <SpaceSettingsModal
          className="ReactModal__Content--canvas"
          overlayClassName="ReactModal__Overlay--canvas"
          modalIsOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
        />
      </div>
    );
  }

});

export default SpaceTile;
