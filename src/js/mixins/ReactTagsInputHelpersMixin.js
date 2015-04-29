import React from 'react';

const ReactTagsInputhelpersMixin = {
  focusInput(event) {
    this.refs[Object.keys(this.refs)[0]].getDOMNode().querySelector('input').focus();
  },

  onTagAdd(tag) {
    this.getValueLink(this.props).requestChange(this.state.tags);
  },

  onTagRemove(tag) {
    const newtags = this.state.tags.filter(function(a) { return a !== tag });
    this.getValueLink(this.props).requestChange(newtags);
  },

  onChangeInput(tag) {
    this.clearError();
  },

  transform(tag) {
    return tag.trim().replace('@sfu.ca', '');
  },

  controlClasses() {
    const controlBaseClass = 'ic-Form-control';
    return this.hasErrors() ? `${controlBaseClass} ic-Form-control--has-error` : controlBaseClass;
  },

  renderError() {
    const error = this.getErrorLink(this.props).value;
    if (error) {
      return (
        <div className="ic-Form-message ic-Form-message--error">
          <div className="ic-Form-message__Layout">
            <i className="icon-warning" role="presentation"></i>
              {error}
          </div>
        </div>
      )
    } else {
      return null;
    }
  }
};

export default ReactTagsInputhelpersMixin;