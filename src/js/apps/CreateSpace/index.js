import ObjectAssign from 'object-assign';

import React from 'react';
import DeepLinkedStateMixin from 'mixins/DeepLinkedStateMixin';

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
