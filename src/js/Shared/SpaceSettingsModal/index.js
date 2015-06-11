'use strict';

import React from 'react';
import Modal from 'react-modal';
import DeepLinkedStateMixin from 'mixins/DeepLinkedStateMixin';
import SpaceNameField from 'Shared/SpaceNameField';
import SpaceDescriptionField from 'Shared/SpaceDescriptionField';
import SpaceJoinLevelField from 'Shared/SpaceJoinLevelField';
import SpaceInitialUsersField from 'Shared/SpaceInitialUsersField';
import SpaceMaillistsField from 'Shared/SpaceMaillistsField';

const initialErrorState = {
  name: '',
  description: '',
  join_type: '',
  members: '',
  maillists: ''
};
const {PropTypes} = React;

Modal.setAppElement(document.getElementById('CanvasSpacesApp'));

const SpaceSettingsModal = React.createClass({
  mixins: [DeepLinkedStateMixin],

  propTypes: {
    modalIsOpen: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func.isRequired,
    className: PropTypes.string,
    overlayClassName: PropTypes.string
  },

  getInitialState() {
    return {
      space: Object.assign({}, this.props.space),
      errors: initialErrorState
    };
  },

  componentWillReceiveProps(nextProps) {
    this.setState({
      space: Object.assign({}, nextProps.space),
      errors: initialErrorState
    });
  },

  validateSpaceName(space_name) {
    this.setError('WHARRRGARBL');
  },

  render() {
    return (
      <Modal isOpen={this.props.modalIsOpen}
             onRequestClose={this.props.onRequestClose}
             className={this.props.className}
             overlayClassName={this.props.overlayClassName}>

        <div className="ReactModal__Layout">

          <div className="ReactModal__InnerSection ReactModal__Header">
            <div className="ReactModal__Header-Title">
              <h4>Edit Space Settings</h4>
            </div>
            <div className="ReactModal__Header-Actions">
              <button className="Button Button--icon-action" type="button" onClick={this.props.onRequestClose}>
                <i className="icon-x"></i>
                <span className="screenreader-only">Close</span>
              </button>
            </div>
          </div>

          <div className="ReactModal__InnerSection ReactModal__Body">
            <div className="ic-Form-group ic-Form-group--horizontal">

              <fieldset>
                <legend>Name and Description</legend>
                <SpaceNameField
                  validate={this.validateSpaceName}
                  foo="bar"
                  valueLink={this.linkState('space.name')}
                  errorLink={this.linkState('errors.name')}
                />

                <SpaceDescriptionField
                  valueLink={this.linkState('space.description')}
                  errorLink={this.linkState('errors.description')}
                />
              </fieldset>

            </div>
          </div>

          <div className="ReactModal__InnerSection ReactModal__Footer">
            <div className="ReactModal__Footer-Actions">
              <button type="button" className="btn btn-default" onClick={this.props.onRequestClose}>Cancel</button>
              <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
            </div>
          </div>

        </div>

      </Modal>

    );
  }

});

export default SpaceSettingsModal;
