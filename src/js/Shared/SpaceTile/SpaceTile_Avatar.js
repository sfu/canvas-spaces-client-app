'use strict';

import React from 'react';
const {string} = React.PropTypes;

const SpaceTile_Avatar = ({avatar}) => (
  <div className="SpaceTile--SpaceAvatar">
    <img src={avatar} />
  </div>
);

SpaceTile_Avatar.propTypes = { avatar: string.isRequired };

export default SpaceTile_Avatar;
