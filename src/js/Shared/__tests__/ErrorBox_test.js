'use strict';

import React from 'react';
import {createRenderer} from 'react-addons-test-utils';
import expect from 'expect';
import expectJsx from 'expect-jsx';
expect.extend(expectJsx);

let renderer;

import ErrorBox from '../ErrorBox';

describe('<ErrorBox>', () => {
  beforeEach(() => {
    renderer = createRenderer();
  });

  it('renders the error when an error is passed', () => {
    renderer.render(<ErrorBox error="Something is horribly wrong" />);
    expect(renderer.getRenderOutput()).toEqualJSX((
      <div className="alert alert-error">
        <strong>Error:</strong> <span>Something is horribly wrong</span>
      </div>
    ));
  });

  it('renders an empty div when no error is passed', () => {
    renderer.render(<ErrorBox />);
    expect(renderer.getRenderOutput()).toEqualJSX(<div />)
  });
});
