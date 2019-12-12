import React from 'react';
import ReactDOM from 'react-dom';
import MemberDashboard from './MemberDashboard';
import {MemoryRouter} from 'react-router-dom';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe.skip('MemberDashboard component testing', () => {

  const tasks = [
    {
      id: 1,
      title: 'hi',
      points: 1
    },
    {
      id: 2,
      title: 'hello',
      points: 2
    },
  ]
  let memberTasks;
  beforeEach(() => {
    memberTasks = shallow(<MemberDashboard tasks={tasks}/>)
  })

  const component = shallow(<MemberDashboard tasks={tasks}/>)

  it('renders without crashing', () => {
    const div = document.createElement('div');
  
    ReactDOM.render(<MemoryRouter><MemberDashboard /></MemoryRouter>, div);
  
    ReactDOM.unmountComponentAtNode(div);
  });
  
  it('renders UI as expected', () => {
    const tree = renderer
      .create(<MemoryRouter><MemberDashboard /></MemoryRouter>)
      .toJSON();
      expect(tree).toMatchSnapshot();
  })

  it.skip('renders empty given no tabs', () => {
    const wrapper = renderer.create(<MemberDashboard tasks={tasks}/>)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('renders 2 tasks', () => {
    expect(memberTasks.find('li').length).toBe(2);
  });
})
