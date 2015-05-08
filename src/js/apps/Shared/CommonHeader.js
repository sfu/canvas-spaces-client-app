'use strict';

import React from 'react';
import Router from 'react-router';
const {Link} = Router;

const CommonHeader = React.createClass({

  render() {
    return (
      <div className="header-bar row-fluid">
        <div className="span8">
          <h1>Canvas Spaces</h1>
          <p>Pop-up Austin gastropub Schlitz, health goth Bushwick mixtape semiotics you probably haven't heard of them four loko whatever. Cornhole single-origin coffee listicle, semiotics Carles meditation Kickstarter DIY food truck street art hella Echo Park Schlitz try-hard cliche. Actually readymade crucifix banh mi deep v gluten-free.</p>
        </div>
        <div className="span4 align-right">
          <Link to="create_space" className="icon-plus Button Button--primary"> Create New Space</Link>
        </div>
      </div>
    );
  }

});

export default CommonHeader;
