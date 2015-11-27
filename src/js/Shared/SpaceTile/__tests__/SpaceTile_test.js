'use strict';

import React from 'react';
import {createRenderer} from 'react-addons-test-utils';
import expect from 'expect';
import expectJsx from 'expect-jsx';
expect.extend(expectJsx);

const SpaceTile = require('../index');
const SpaceTile_Information = require('../SpaceTile_Information');
const SpaceTile_Avatar = require('../SpaceTile_Avatar');
const SpaceSettingsModal = require('Shared/SpaceSettingsModal');

let renderer;

describe('<SpaceTile>', () => {
  beforeEach(() => {
    renderer = createRenderer();
  });

  it('works?', () => {
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
    renderer.render((
      <SpaceTile
        space={space}
        avatar={space.avatar_url}
        context="mine"
        serverConfig={serverConfig}
      />
    ));

    expect(renderer.getRenderOutput()).toEqualJSX((
      <div>
        <div className="SpaceTile">
          <SpaceTile_Information
            name="Test"
            description="Test"
            is_leader={false}
            editButtonHandler={function noRefCheck() {}}
            space_url="/groups/1"
          />
          <SpaceTile_Avatar
            avatar="avatar.png"
          />
        </div>
        <SpaceSettingsModal
          space={space}
          className="ReactModal__Content--canvas"
          overlayClassName="ReactModal__Overlay--canvas"
          modalIsOpen={false}
          onRequestClose={function noRefCheck() {}}
          serverConfig={serverConfig}
        />
      </div>
    ));
  });
});
