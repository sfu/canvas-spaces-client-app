/* eslint no-alert:0 */
'use strict';

import React from 'react';
import DeepLinkedStateMixin from 'mixins/DeepLinkedStateMixin';

import api from 'utils/api';
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


const CreateSpace = React.createClass({
  mixins: [DeepLinkedStateMixin],

  getInitialState() {
    return {
      space: {
        name: '',
        description: '',
        join_type: 'invite_only',
        members: [],
        maillists: []
      },
      errors: initialErrorState
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

  render() {
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

          <fieldset>
            <legend>Privacy Options</legend>

            <SpaceJoinLevelField
              checked={this.state.space.join_type}
              valueLink={this.linkState('space.join_type')}
            />
          </fieldset>

          <fieldset>
            <legend>Space Membership</legend>
            <SpaceInitialUsersField
              valueLink={this.linkState('space.members')}
              errorLink={this.linkState('errors.members')}
            />

            <SpaceMaillistsField
              valueLink={this.linkState('space.maillists')}
              errorLink={this.linkState('errors.maillists')}
            />
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

          <fieldset>
            <legend>Debug</legend>
            <pre>
              {JSON.stringify(this.state, null, 2)}
            </pre>
          </fieldset>


        </div>
      </div>
    );
  }
});


export default CreateSpace;
