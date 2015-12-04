'use strict';

import React from 'react';
import {createRenderer} from 'react-addons-test-utils';
import expect from 'expect';
import expectJsx from 'expect-jsx';
expect.extend(expectJsx);

import LoadMoreDingus from '../LoadMoreDingus';

let renderer;

describe('<LoadMoreDingus>', () => {

  const oldError = console.error;

  beforeEach(() => {
    renderer = createRenderer();
    console.error = (str) => {
      throw new Error(str);
    }
  afterEach(() => {
    console.error = oldError;
  });

  it('renders with a static icon when not loading', () => {
    renderer.render((
      <LoadMoreDingus />
    ));
    console.log(renderer.getRenderOutput());
  });

  it('renders an empty div when no error is passed', () => {
    renderer.render(<ErrorBox />);
    expect(renderer.getRenderOutput()).toEqualJSX(<div />)
  });
});
