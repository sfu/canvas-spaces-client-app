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

  const defaultProps = {
    disabled: false,
    loading: false,
    onClick: () => {},
    title: "Load More"
  }

  let testProps;

  beforeEach(() => {
    renderer = createRenderer();
    console.error = (str) => {
      throw new Error(str);
    }
    testProps = Object.assign({}, defaultProps);
  });

  afterEach(() => {
    console.error = oldError;
  });

  it('renders with a static icon when not loading', () => {
    renderer.render((
      <LoadMoreDingus
        {...testProps}
      />
    ));
    const expected = (
      <button
        title="Load More"
        onClick={() => {}}
        className="Button Button--primary LoadMoreDingus"
        disabled={false}
      >
        <i className="icon-more"></i>
      </button>
    )
    expect(renderer.getRenderOutput()).toEqualJSX(expected);
  });

  it('renders with an animated icon when loading', () => {
    testProps.loading = true;
    renderer.render((
      <LoadMoreDingus
        {...testProps}
      />
    ));
    const expected = (
      <button
        title="Load More"
        onClick={() => {}}
        className="Button Button--primary LoadMoreDingus"
        disabled={false}
      >
      <div className="LoadMoreDingus--LoadingIndicator">
        <div className="LoadMoreDingus--LoadingIndicator-bounce"></div>
        <div className="LoadMoreDingus--LoadingIndicator-bounce"></div>
        <div className="LoadMoreDingus--LoadingIndicator-bounce"></div>
      </div>
      </button>
    )
    expect(renderer.getRenderOutput()).toEqualJSX(expected);
  });

  it('throws when missing a required prop', () => {
    expect(() => {
      renderer.render(<LoadMoreDingus />);
    }).toThrow(/Failed propType/);
  })

});
