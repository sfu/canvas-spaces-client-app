'use strict';

import React from 'react';
import {createRenderer} from 'react-addons-test-utils';
import expect from 'expect';
import expectJsx from 'expect-jsx';
expect.extend(expectJsx);

import SpaceTile_Information from '../SpaceTile_Information';

describe('<SpaceTile_Information />', () => {

  const oldError = console.error;
  let renderer;

  beforeEach(() => {
    renderer = createRenderer();
    console.error = (str) => {
      throw new Error(str);
    }
  });

  afterEach(() => {
    console.error = oldError;
  });

  describe('when space leader', () => {
    it('renders the element with the edit button and text', () => {
      renderer.render(<SpaceTile_Information name="Test" description="Test" space_url="/test" is_leader={true} editButtonHandler={() => {}}/>);
      expect(renderer.getRenderOutput()).toEqualJSX((
        <div className="SpaceTile--SpaceInformation">
          <a style={{color: '#000'}} href="/test"><h1 title="Test">Test</h1></a>
          <h2 title="Test">Test</h2>
          <button
            className="SpaceTile--SpaceInformation-editButton Button Button--small"
            onClick={() => {}}
          >
            <i className="icon-settings"></i>
            Change Space Settings
          </button>
          <p className="SpaceTile--SpaceInformation-leaderNote">
            You are the leader of this space.
          </p>
        </div>
      ));
    });
  });

  describe('when not space leader', () => {
    it('renders the element without the edit button and text', () => {
      renderer.render(<SpaceTile_Information name="Test" description="Test" space_url="/test" is_leader={false} editButtonHandler={() => {}} />);
      expect(renderer.getRenderOutput()).toEqualJSX((
        <div className="SpaceTile--SpaceInformation">
          <a style={{color: '#000'}} href="/test"><h1 title="Test">Test</h1></a>
          <h2 title="Test">Test</h2>
          {''}
        </div>
      ));
    });
  });

  it('throws when missing a required prop', () => {
    expect(() => {
      renderer.render(<SpaceTile_Information />)
    }).toThrow(/Failed propType/);
  });

});
