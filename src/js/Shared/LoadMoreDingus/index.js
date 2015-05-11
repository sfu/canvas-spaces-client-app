'use strict';

import React from 'react';
const {PropTypes} = React;

const LoadMoreDingus = React.createClass({

  propTypes: {
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
  },

  getDefaultProps() {
    return {
      title: 'Load More',
      onClick: () => {},
      loading: false
    };
  },

  render() {

    const loading_icon = (
      <div className="LoadMoreDingus--LoadingIndicator">
        <div className="LoadMoreDingus--LoadingIndicator-bounce"></div>
        <div className="LoadMoreDingus--LoadingIndicator-bounce"></div>
        <div className="LoadMoreDingus--LoadingIndicator-bounce"></div>
      </div>
    );

    const static_icon = (<i className="icon-more"></i>);

    const icon = this.props.loading ? loading_icon : static_icon;

    return (
      <button
        title={this.props.title}
        onClick={this.props.onClick}
        className="Button Button--primary LoadMoreDingus"
        disabled={this.props.disabled}
      >
        {icon}
      </button>
    );
  }

});




export default LoadMoreDingus;

