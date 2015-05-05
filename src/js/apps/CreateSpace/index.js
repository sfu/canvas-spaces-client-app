import ObjectAssign from 'object-assign';

import React from 'react';
import DeepLinkedStateMixin from 'mixins/DeepLinkedStateMixin';

import api from 'utils/api';
import SpaceNameField from './SpaceNameField';
import SpaceDescriptionField from './SpaceDescriptionField';
import SpaceJoinLevelField from './SpaceJoinLevelField';
import SpaceInitialUsersField from './SpaceInitialUsersField';
import SpaceMaillistsField from './SpaceMaillistsField';

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

  handleSubmit() {
    if (this.disableSubmit()) {
      // TODO: make this a better error. Flash message?
      window.alert('Something is wrong. Please check for errors.');
      return;
    }

    api.create_space(this.state.space, (response) => {
      if (response.status !== 200) {
        if (response.body.hasOwnProperty('field')) {
          this.linkState(`errors.${response.body.field}`).requestChange(response.body.error);
        } else {
          // TODO: handle generic errors
          window.alert('Something went wrong.');
        }
      } else {
        // redirect to the new space
        var space_url = `/groups/${response.body.id}`;
        if (__DEV__) {
          space_url = `http://canvas.dev${space_url}`;
        }
        // TODO: Set a flash message before redirecting?
        window.location = space_url;
      }
    }.bind(this));

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
