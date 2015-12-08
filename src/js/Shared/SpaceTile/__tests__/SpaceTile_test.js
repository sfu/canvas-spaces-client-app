'use strict';

import React from 'react';
import expect from 'expect';
import {shallow} from 'enzyme';

const SpaceTile = require('../index');
const SpaceTile_Information = require('../SpaceTile_Information');
const SpaceTile_Avatar = require('../SpaceTile_Avatar');
const SpaceSettingsModal = require('Shared/SpaceSettingsModal');


describe('<SpaceTile>', () => {

  const oldError = console.error;

  beforeEach(() => {
    console.error = (str) => {
      throw new Error(str);
    }
  });

  afterEach(() => {
    console.error = oldError;
  });

  it('renders a tile for a space', () => {
    const space = {
      id: 1,
      name: 'Test',
      description: 'Test',
      is_leader: false,
      maillist: '',
      leader_id: 123,
      users: [],
      avatar_url: 'avatar.png'
    };
    const serverConfig = { public_spaces_enabled: false };
    const wrapper = shallow((
      <SpaceTile
        space={space}
        avatar={space.avatar_url}
        context="mine"
        serverConfig={serverConfig}
      />
    ));

    expect(wrapper.find('.SpaceTile').length).toEqual(1);
    expect(wrapper.find(SpaceTile_Information).length).toEqual(1);
    expect(wrapper.find(SpaceTile_Avatar).length).toEqual(1);
    expect(wrapper.find(SpaceSettingsModal).length).toEqual(1);
  });

  it('throws when missing a required prop', () => {
    expect(() => {
      shallow((
        <SpaceTile />
      ));
    }).toThrow();
  });

});
