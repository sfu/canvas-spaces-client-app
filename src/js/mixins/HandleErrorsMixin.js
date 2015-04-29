const HandleErrorsMixin = {
  setError(error) {
    this.getErrorLink(this.props).requestChange(error);
  },

  clearError() {
    this.getErrorLink(this.props).requestChange('');
  },

  getErrorLink(props) {
    return props.errorLink || {
      value: props.value,
      requestChange: this.setError
    }
  }
};

export default HandleErrorsMixin;