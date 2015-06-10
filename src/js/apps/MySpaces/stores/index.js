'use strict';

import alt from '../alt';
import makeHot from 'alt/utils/makeHot';
import SpaceActions from '../actions';
import DefaultAvatars from 'Shared/DefaultAvatars';

let defaultAvatars = new DefaultAvatars();

class SpaceStore {
  constructor() {
    this.spaces = [];
    this.links = [];
    this.loading = false;

    this.bindListeners({
      handleUpdateSpaces: SpaceActions.UPDATE_SPACES,
      handleFetchSpaces: SpaceActions.FETCH_SPACES,
      handleSpacesFailed: SpaceActions.SPACES_FAILED
    });
  }

  handleUpdateSpaces(payload) {
    this.loading = false;
    payload.spaces.forEach((space) => {
      if (!space.avatar_url) {
        space.avatar_url = defaultAvatars.next();
      }
    });
    this.spaces = this.spaces.concat(payload.spaces);
    this.links = payload.links;
  }

  handleFetchSpaces() {
    this.loading = true;
  }

  handleSpacesFailed(errorMessage) {
    console.log(errorMessage);
  }
}

export default makeHot(alt, SpaceStore, 'SpaceStore');
