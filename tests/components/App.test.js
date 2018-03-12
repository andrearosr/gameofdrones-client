import React from 'react'
import { shallow, configure } from 'enzyme'
import { RoutedTabs, NavTab } from 'react-router-tabs'
import Adapter from 'enzyme-adapter-react-16'

import Layout from '../../app/containers/Layout'

configure({ adapter: new Adapter() })

describe('Layout Component', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<Layout />);
  })

  it('should exist', () => {
    expect(wrapper).toBeTruthy();
  })

  it('should have 2 routed tabs', () => {
    expect(wrapper.find(RoutedTabs)).toBeTruthy();
    expect(wrapper.find(NavTab)).toHaveLength(2);
  })
})
