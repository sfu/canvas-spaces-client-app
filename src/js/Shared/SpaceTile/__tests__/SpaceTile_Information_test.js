'use strict';

import React from 'react';
import expect from 'expect';
import {shallow} from 'enzyme';

import SpaceTile_Information from '../SpaceTile_Information';

describe('<SpaceTile_Information />', () => {

  const oldError = console.error;

  const defaultProps = {
    name: 'Test',
    description: 'Test',
    space_url: '/test',
    is_leader: true,
    editButtonHandler: () => {}
  };

  let testProps;

  beforeEach(() => {
    testProps = Object.assign({}, defaultProps);
    console.error = (str) => {
      throw new Error(str);
    }
  });

  afterEach(() => {
    console.error = oldError;
  });

  describe('when space leader', () => {
    it('renders the element with the edit button and text', () => {
      const wrapper = shallow(
        <SpaceTile_Information
          {...testProps}
        />
      );

      expect(wrapper.find('.SpaceTile--SpaceInformation').length).toEqual(1);
      expect(wrapper.find('.SpaceTile--SpaceInformation-editButton').length).toEqual(1);
      expect(wrapper.find('.SpaceTile--SpaceInformation-leaderNote').text()).toEqual('You are the leader of this space.');
    });
  });

  describe('when not space leader', () => {
    it('renders the element without the edit button and text', () => {
      testProps.is_leader = false;
      const wrapper = shallow(
        <SpaceTile_Information
          {...testProps}
        />
      );

      expect(wrapper.find('.SpaceTile--SpaceInformation').length).toEqual(1);
      expect(wrapper.find('.SpaceTile--SpaceInformation-editButton').length).toEqual(0);
    });
  });

  it('throws when missing a required prop', () => {
    expect(() => {
      shallow(<SpaceTile_Information />)
    }).toThrow(/Failed propType/);
  });

});
