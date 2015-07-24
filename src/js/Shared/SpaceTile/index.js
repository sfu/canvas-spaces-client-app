'use strict';

import React from 'react';
const {PropTypes} = React;

import SpaceTile_Information from './SpaceTile_Information';
import SpaceTile_Avatar from './SpaceTile_Avatar';
import SpaceSettingsModal from 'Shared/SpaceSettingsModal';

const SpaceTile = React.createClass({

  propTypes: {
    space: PropTypes.object.isRequired,
    avatar: PropTypes.string,
    context: PropTypes.string.isRequired
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
    var space_url = `/groups/${this.props.space.id}`;
    if (__DEV__) {
      space_url = `http://canvas.dev${space_url}`;
    }
    const space = this.props.space;
    return (
      <div>
        <a href={space_url}>
          <div className="SpaceTile">
            <SpaceTile_Information
              name={space.name}
              description={space.description}
              is_leader={space.is_leader}
              editButtonHandler={this.openModal}
            />
            <SpaceTile_Avatar
              avatar={this.props.avatar}
            />
          </div>
        </a>
        <SpaceSettingsModal
          space={this.props.space}
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
