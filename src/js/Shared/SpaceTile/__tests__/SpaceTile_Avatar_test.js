/* eslint-env mocha eslint-unused */
'use strict';

import React from 'react';
import {createRenderer} from 'react-addons-test-utils';
import expect from 'expect';
import expectJsx from 'expect-jsx';
expect.extend(expectJsx);

import SpaceTile_Avatar from '../SpaceTile_Avatar';

before((done) => {
  React; //bypass ESLint no-unused-var error
  done();
});

describe('<SpaceTile_Avatar />', () => {

  const oldError = console.error;

  beforeEach(() => {
    console.error = (str) => {
      throw new Error(str);
    }
  });

  afterEach(() => {
    console.error = oldError;
  });

  it('renders the element', () => {
    const renderer = createRenderer();
    renderer.render(<SpaceTile_Avatar avatar="avatar.png" />);
    expect(renderer.getRenderOutput()).toEqualJSX(<div className="SpaceTile--SpaceAvatar"><img src="avatar.png" /></div>);
  });

  it('throws when no avatar prop passed', () => {
    const renderer = createRenderer();
    expect(() => {
      renderer.render(<SpaceTile_Avatar />);
    }).toThrow(/Failed propType/);
  });
});
