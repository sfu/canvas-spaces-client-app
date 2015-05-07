import React from 'react';
import CommonHeader from 'apps/Shared/CommonHeader';
import api from 'utils/api';

const MySpaces = React.createClass({

  getInitialState() {
    return {
      links: null,
      spaces: []
    };
  },

  componentDidMount() {
    api.get_spaces_for_user('self', (spaces, links) => {
      this.setState({
        spaces: spaces,
        links: links
      })
    }.bind(this))
  },

  render() {
    return (
      <div>
        <CommonHeader />
        <div className="content-box">

          <div className="grid-row">
            <div className="col-xs">
              <h2>My Canvas Spaces</h2>
              <p>
                These are the spaces of which you are a member.
                Spaces of which you are the Leader are marked with a <i className="icon-star"></i>
              </p>
            </div>
          </div>
        </div>

        <div className="grid-row">
          <div className="col-xs">
            <pre>{JSON.stringify(this.state, null, 2)}</pre>
          </div>
        </div>

      </div>
    );
  }

});

export default MySpaces;
