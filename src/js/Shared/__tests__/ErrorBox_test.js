'use strict';

import React from 'react';
import {shallow} from 'enzyme';
import expect from 'expect';

import ErrorBox from '../ErrorBox';

describe('<ErrorBox>', () => {
  it('renders the error when an error is passed', () => {
    const wrapper = shallow(<ErrorBox error="Something is horribly wrong" />);
    expect(wrapper.find('.alert').length).toEqual(1);
    expect(wrapper.text()).toEqual('Error: Something is horribly wrong');
  });

  it('renders an empty div when no error is passed', () => {
    const wrapper = shallow(<ErrorBox />);
    expect(wrapper.find('div').length).toEqual(1);
    expect(wrapper.find('.alert').length).toEqual(0);
    expect(wrapper.text()).toEqual('');
  });
});
