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
      <div className="ic-Form-control">
        <label for="space_initial_users" className="ic-Label">Initial Users</label>
        <div className="ic-Input">
          <TagsInput
            ref="space_initial_users"
            valueLink={this.linkState('tags')}
            placeholder="Add member (e.g. kipling@sfu.ca)"
            addKeys={[9, 13, 32, 188]} // tab, return, space, comma
            removeKeys={[]}
            validate={this.validate}
            transform={this.transform}
            onTagAdd={this.onTagAdd}
            onChangeInput={this.onChangeInput}
          />
        </div>
      </div>
    );
  }

});

export default SpaceInitialUsersField;