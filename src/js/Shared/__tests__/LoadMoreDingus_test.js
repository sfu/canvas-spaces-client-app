'use strict';

import React from 'react';
import expect from 'expect';
import {shallow} from 'enzyme';

import LoadMoreDingus from '../LoadMoreDingus';

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
    console.error = (str) => {
      throw new Error(str);
    }
    testProps = Object.assign({}, defaultProps);
  });

  afterEach(() => {
    console.error = oldError;
  });

  it('renders with a static icon when not loading', () => {
    const wrapper = shallow(<LoadMoreDingus {...testProps} />);
    const myComponents = wrapper.find('button');
    expect(wrapper.find('button').length).toEqual(1);
  });

  it('renders with an animated icon when loading', () => {
    testProps.loading = true;
    const wrapper = shallow(<LoadMoreDingus {...testProps} />);
    const myComponents = wrapper.find('button');
    expect(wrapper.find('button').length).toEqual(1);
    expect(wrapper.find('.LoadMoreDingus--LoadingIndicator').length).toEqual(1);
  });

  it('throws when missing a required prop', () => {
    expect(() => {
      shallow(<LoadMoreDingus />);
    }).toThrow(/Failed propType/);
  });

});
