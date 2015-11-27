
/* eslint-env mocha eslint-unused */
'use strict';

import expect from 'expect';
import expectJsx from 'expect-jsx';
expect.extend(expectJsx);

describe('<SpaceTile>', () => {

  let React = require('react');;
  let TestUtils;
  let renderer;

  React; //bypass ESLint no-unused-var error

  beforeEach(() => {
    TestUtils = require('react-addons-test-utils');
    renderer = TestUtils.createRenderer();
  });

  it('works?', () => {
    const SpaceTile = require('../index');
    const SpaceTile_Information = require('../SpaceTile_Information');
    const SpaceTile_Avatar = require('../SpaceTile_Avatar');
    const SpaceSettingsModal = require('shared/SpaceSettingsModal');
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
    const space_url = '/test';
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
