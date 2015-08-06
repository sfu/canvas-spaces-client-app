/* eslint no-alert:0 */
'use strict';

import React from 'react';
import DeepLinkedStateMixin from 'mixins/DeepLinkedStateMixin';

import api from 'utils/api';
import SpaceNameField from 'Shared/SpaceNameField';
import SpaceDescriptionField from 'Shared/SpaceDescriptionField';
import SpaceJoinLevelField from 'Shared/SpaceJoinLevelField';
import SpaceMaillistField from 'Shared/SpaceMaillistField';

const initialErrorState = {
  name: '',
  description: '',
  join_type: '',
  maillist: ''
};


const CreateSpace = React.createClass({
  mixins: [DeepLinkedStateMixin],

  getInitialState() {
    return {
      space: {
        name: '',
        description: '',
        join_type: 'invite_only',
        maillist: ''
      },
      errors: Object.assign({}, initialErrorState)
    };
  },

  disableSubmit() {
    if (this.state.space.name === '' || this.state.space.description === '') { return true; }
    if (JSON.stringify(initialErrorState) !== JSON.stringify(this.state.errors)) { return true; }
    return false;
  },

  flashError(error_message) {
    if (__DEV__) {
      window.alert(error_message);
    } else {
      $.flashError(error_message);
    }
  },

  handleSubmit() {
    const error_message = 'There was a problem creating your space. Please check the form for errors and try again.';
    if (this.disableSubmit()) {
      this.flashError(error_message);
      return;
    }

    api.create_space(this.state.space, (response) => {
      if (response.status !== 200) {

        if (response.body.hasOwnProperty('field')) {
          this.linkState(`errors.${response.body.field}`).requestChange(response.body.error);
        }
        this.flashError(error_message);
      } else {
        // redirect to the new space
        var space_url = `/groups/${response.body.id}`;
        if (__DEV__) {
          space_url = `http://canvas.dev${space_url}`;
        }
        // TODO: show a modal with a choice: go to new space, or create a new one?
        window.location = space_url;
      }
    }.bind(this));

  },

  validateSpaceName(space_name, cb) {
    // // validate name against api
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

    const maillist_help_text = () => {
      if (this.state.space.join_type === 'invite_only') {
        return (<p>The membership of your Space will be updated when the membership
          of the maillist changes. Only SFU members of the maillist will be synchronized
          with the Space.</p>);
      } else {
        return (<p>There will be a one-time sync of the SFU members of the maillist with the Space.</p>);
      }
    };

    const debug = () => {
        return __DEV__ ? (
          <fieldset>
            <legend>Debug</legend>
            <pre>
              {JSON.stringify(this.state, null, 2)}
            </pre>
          </fieldset>
        ) : '';
    };

    return (
      <div>
        <h2>Create New Space</h2>
        <div className="ic-Form-group ic-Form-group--horizontal">

          <fieldset>
            <legend>Name and Description</legend>
            <SpaceNameField
              valueLink={this.linkState('space.name')}
              errorLink={this.linkState('errors.name')}
              validate={this.validateSpaceName}
            />

            <SpaceDescriptionField
              valueLink={this.linkState('space.description')}
              errorLink={this.linkState('errors.description')}
            />
          </fieldset>

          {join_type_field()}

          <fieldset>
            <p>
              You can use a <a href="http://maillist.sfu.ca" target="_blank">SFU Maillist</a> to control who can access your Space.
              If you don't have a list set up already, you can add one later. <br />
              If you don't add a maillist, you will be the only member of your Space.
            </p>

            <legend>Space Membership</legend>

            <SpaceMaillistField
              valueLink={this.linkState('space.maillist')}
              errorLink={this.linkState('errors.maillist')}
              validate={this.validateMaillist}
            />
            {maillist_help_text()}
          </fieldset>

          <div className="ic-Form-actions">
            <button
              className="Button Button--primary"
              disabled={this.disableSubmit()}
              type="submit"
              onClick={this.handleSubmit}
          >
            Create Space
          </button>
          </div>

          {debug()}

        </div>
      </div>
    );
  }
});


export default CreateSpace;
