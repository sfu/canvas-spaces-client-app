'use strict';

const ReactTagsInputhelpersMixin = {
  focusInput() {
    this.refs[Object.keys(this.refs)[0]].getDOMNode().querySelector('input').focus();
  },

  onTagAdd() {
    this.getValueLink(this.props).requestChange(this.state.tags);
  },

  onTagRemove(tag) {
    const newtags = this.state.tags.filter(function(a) { return a !== tag; });
    this.getValueLink(this.props).requestChange(newtags);
  },

  onChangeInput() {
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
      );
    } else {
      return null;
    }
  }
};

export default ReactTagsInputhelpersMixin;
