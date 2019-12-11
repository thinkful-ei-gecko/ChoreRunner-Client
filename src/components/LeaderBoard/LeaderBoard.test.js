import React from 'react';
import ReactDOM from 'react-dom';
import LeaderBoard from './LeaderBoard';
import {MemoryRouter} from 'react-router-dom';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe.skip('LeaderBoard component testing', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
  
    ReactDOM.render(<MemoryRouter><LeaderBoard /></MemoryRouter>, div);
  
    ReactDOM.unmountComponentAtNode(div);
  });
  
  it('renders UI as expected', () => {
    const tree = renderer
      .create(<MemoryRouter><LeaderBoard /></MemoryRouter>)
      .toJSON();
      expect(tree).toMatchSnapshot();
  })

  it('renders empty given no tabs', () => {
    const wrapper = shallow(<LeaderBoard />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('reads the components State and lifecycle method', () => {
    const wrapper = shallow(<LeaderBoard />)
    const compInstance = wrapper.instance();
    //Access lifecycle method
    compInstance.componentDidMount()
    expect(wrapper.state('members')).toEqual([])
  })
})
