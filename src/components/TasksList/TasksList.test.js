import React from 'react';
import ReactDOM from 'react-dom';
import TasksList from './TasksList';
import {MemoryRouter} from 'react-router-dom';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json'

describe.skip('TasksList component testing', () => {

  const tasks = [
    {
      id: 1,
      title: 'Test',
      household_id: 1,
      user_id: 1,
      member_id: 1,
      points: 5,
      status: 'assigned'
    }
  ]
  it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(<MemoryRouter><TasksList {...tasks}/></MemoryRouter>, div);

    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders UI as expected', () => {
    const tree = renderer
        .create(<MemoryRouter><TasksList {...tasks}/></MemoryRouter>)
        .toJSON();
        expect(tree).toMatchSnapshot();
  })

  it('renders empty given no tabs', () => {
    const wrapper = mount(<TasksList {...tasks}/>)
    expect(toJson(wrapper)).toMatchSnapshot()
  })


})