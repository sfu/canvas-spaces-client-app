'use strict';

import React from 'react';
import expect from 'expect';
import {shallow} from 'enzyme';

import SpaceTile_Avatar from '../SpaceTile_Avatar';

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
    const wrapper = shallow(<SpaceTile_Avatar avatar="avatar.png" />);
    expect(wrapper.find('.SpaceTile--SpaceAvatar').length).toEqual(1);
    expect(wrapper.find('img').length).toEqual(1);
  });

  it('throws when no avatar prop passed', () => {
    expect(() => {
      shallow(<SpaceTile_Avatar />);
    }).toThrow(/Failed propType/);
  });
});
