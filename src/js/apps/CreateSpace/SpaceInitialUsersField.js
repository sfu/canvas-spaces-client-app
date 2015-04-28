import React from 'react/addons';
import TagsInput from 'react-tagsinput';

import api from 'utils/api';

const SpaceInitialUsersField = React.createClass({

  mixins: [React.addons.LinkedStateMixin],

  getInitialState() {
    return {
      tags: []
    };
  },

  transform(tag) {
    tag = tag.trim();
    tag = tag.replace('@sfu.ca', '');
    return tag;
  },

  validate: function (tag, done) {
    var unique = this.state.tags.indexOf(tag) === -1;
    if (!unique) { return done(false); }

    api.validate_sfu_username(tag, (result) => {
      const ok = result.valid_user === true;
      done(ok);
    });
  },

  focusInput(event) {
    this.refs.space_initial_users.getDOMNode().querySelector('input').focus();
  },

  render: function() {
    return (
      <div onClick={this.focusInput} className="ic-Form-control">
        <label htmlFor="space_initial_users" className="ic-Label">Initial Users</label>
        <div className="SFU-tagsinput-wrapper">
          <TagsInput
            name="space_initial_users"
            ref="space_initial_users"
            valueLink={this.linkState('tags')}
            placeholder="e.g. kipling@sfu.ca"
            classNamespace="SFU"
            addKeys={[9, 13, 32, 188]} // tab, return, space, comma
            removeKeys={[]}
            transform={this.transform}
            validateAsync={this.validate}
          />
        </div>
      </div>
    );
  }

});

export default SpaceInitialUsersField;