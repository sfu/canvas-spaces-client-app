import React from 'react';
const {PropTypes} = React;

const SpaceTile_Avatar = React.createClass({
  propTypes: {
    avatar: PropTypes.string.isRequired
  },

  getDefaultProps() {
    return {
      avatar: 'http://www.ilikewallpaper.net/ipad-wallpapers/download/2268/Square-Pattern-ipad-wallpaper-ilikewallpaper_com.jpg'
    };
  },

  render() {
    return (
      <div className="SpaceTile--SpaceAvatar">
        <img src={this.props.avatar} />
      </div>

    );
  }

});

export default SpaceTile_Avatar;