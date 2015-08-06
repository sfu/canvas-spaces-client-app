'use strict';

import React from 'react';
import Modal from 'react-modal';
import DeepLinkedStateMixin from 'mixins/DeepLinkedStateMixin';
import api from 'utils/api';
import SpaceNameField from 'Shared/SpaceNameField';
import SpaceDescriptionField from 'Shared/SpaceDescriptionField';
import SpaceJoinLevelField from 'Shared/SpaceJoinLevelField';
import SpaceMaillistField from 'Shared/SpaceMaillistField';
import SpaceLeaderField from 'Shared/SpaceLeaderField';
import SpaceActions from '../../apps/MySpaces/actions';

const initialErrorState = {
  name: '',
  description: '',
  join_type: '',
  members: '',
  maillist: '',
  leader_id: ''
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
      original_space: Object.assign({}, this.props.space),
      errors: Object.assign({}, initialErrorState),
      delete_button: {
        show_field: false,
        deletable: false,
        disabled: false
      }
    };
  },

  componentWillReceiveProps(nextProps) {
    this.setState({
      space: Object.assign({}, nextProps.space),
      errors: Object.assign({}, initialErrorState),
      delete_button: {
        show_field: false,
        deletable: false,
        disabled: false
      }
    });
  },

  disableSubmit() {
    if (this.state.space.name === '' || this.state.space.description === '') { return true; }
    if (JSON.stringify(initialErrorState) !== JSON.stringify(this.state.errors)) { return true; }
    return false;
  },

  handleSubmit() {
    // do the validations and whatnot, and if everything is all good, pass it up the chain
    // ...validate...
    SpaceActions.updateSpace(this.state.space, () => {
      this.props.onRequestClose();
    });
  },

  deleteSpace() {
    if (!this.state.delete_button.show_field) {
      this.setState({
        delete_button: {
          show_field: true,
          deletable: false,
          disabled: true
        }
      });
      return;
    }

    if (this.state.delete_button.deletable) {
        SpaceActions.deleteSpace(this.state.space, () => {
          console.log('done?');
        });
    }
  },

  validateSpaceName(space_name, cb) {
    // // validate name against api
    if (this.state.original_space.name === space_name) { return; }
    api.validate_field('name', space_name, (result) => {
      if (!result.valid_group_name) {
        cb(result.message);
      }
    });
  },

  validateMaillist(maillist, cb) {
    api.validate_field('maillist', maillist, (result) => {
      if (!result.valid_maillist) {
        cb(result.reason);
      }
    });
  },

  validateDeleteSpace(ev) {
    let delete_state;
    if (ev.target.value === this.state.space.name) {
      delete_state = {
        delete_button: {
          show_field: true,
          deletable: true,
          disabled: false
        }
      };
    } else {
      delete_state = {
        delete_button: {
          show_field: true,
          deletable: false,
          disabled: true
        }
      };
    }
    this.setState(delete_state);
  },

  render() {
    const join_type_field = () => {
      return this.props.serverConfig.public_spaces_enabled === 'yes' ? (
        <fieldset>
          <legend>Privacy Options</legend>

          <SpaceJoinLevelField
            checked={this.state.space.join_type}
            valueLink={this.linkState('space.join_type')}
          />
        </fieldset>
      ) : '';
    };

    const delete_space_field = () => {
      return this.state.delete_button.show_field ? (
        <div style={{textAlign: 'center'}}>
          <input
            type="text"
            className="ic-Input"
            style={{marginBottom: '1em'}}
            placeholder="Type the name of your space to confirm deletion"
            onChange={this.validateDeleteSpace}
          />
        </div>
      ) : '';
    };

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
                  valueLink={this.linkState('space.name')}
                  errorLink={this.linkState('errors.name')}
                />

                <SpaceDescriptionField
                  valueLink={this.linkState('space.description')}
                  errorLink={this.linkState('errors.description')}
                />
              </fieldset>

              <fieldset>
                <legend>Space Membership</legend>

                <SpaceMaillistField
                  valueLink={this.linkState('space.maillist')}
                  errorLink={this.linkState('errors.maillist')}
                  validate={this.validateMaillist}
                />
              </fieldset>

              <fieldset>
                <legend>Space Leader</legend>
                <p>The Space Leader is the administrator of a Space. Only the Space Leader can modify a Space's settings. There can be only one Space Leader at a time.</p>
                <p><strong>If you reassign leadership of this Space to another member, you will no longer be able to modify this Space's settings.</strong></p>
                <SpaceLeaderField
                  valueLink={this.linkState('space.leader_id')}
                  errorLink={this.linkState('errors.leader_id')}
                  current={this.state.space.leader_id}
                  users={this.state.space.users}
                />
              </fieldset>

              {join_type_field()}

            </div>

            <hr/>
            {delete_space_field()}
            <button
              style={{width: '100%'}}
              className="Button Button--danger"
              disabled={this.state.delete_button.disabled}
              onClick={this.deleteSpace}
            >
              Delete Space
            </button>

          </div>

          <div className="ReactModal__InnerSection ReactModal__Footer">
            <div className="ReactModal__Footer-Actions">
              <button
                type="button"
                className="btn btn-default"
                onClick={this.props.onRequestClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={this.handleSubmit}
                disabled={this.disableSubmit()}
                >
                Submit
              </button>
            </div>
          </div>

        </div>

      </Modal>

    );
  }

});

export default SpaceSettingsModal;
