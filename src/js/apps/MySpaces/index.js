import React from 'react';
import CommonHeader from 'apps/Shared/CommonHeader';
import SpaceTile from 'apps/Shared/SpaceTile';
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
    const spaceTiles = () => {
      return this.state.spaces.map((space) => {
        const leader = space.is_leader ? (<i className="icon-star"></i>) : '';
        return (
          <SpaceTile
            key={`space_${space.id}`}
            name={space.name}
            description={space.description}
            is_leader={space.is_leader}
            space_id={space.id}
          />
        );
      });
    }

    return (
      <div>
        <CommonHeader />
        <div className="content-box">

          <div className="grid-row">
            <div className="col-xs">
              <h2>My Canvas Spaces</h2>
            </div>
          </div>
        </div>

        <div className="grid-row">
          {spaceTiles()}
        </div>

        <div style={{marginTop: '20px'}} className="grid-row">
          <div className="col-xs">
            <pre>{JSON.stringify(this.state, null, 2)}</pre>
          </div>
        </div>

      </div>
    );
  }

});

export default MySpaces;
