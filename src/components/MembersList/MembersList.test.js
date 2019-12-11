import React from 'react';
import ReactDOM from 'react-dom';
import MembersList from './MembersList';
import {MemoryRouter} from 'react-router-dom';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json'

describe.skip('MembersList component testing', () => {
  const data = [
    {
      name: 'Test',
      total_score: 1,
    },
  ]
  it('renders without crashing', () => {
    const div = document.createElement('div');
  
    ReactDOM.render(<MemoryRouter><MembersList data={data}/></MemoryRouter>, div);
  
    ReactDOM.unmountComponentAtNode(div);
  });
  
  it('renders UI as expected', () => {
    const tree = renderer
        .create(<MemoryRouter><MembersList data={data}/></MemoryRouter>)
        .toJSON();
        expect(tree).toMatchSnapshot();
  })

  it('renders empty given no tabs', () => {
    const wrapper = shallow(<MembersList data={data}/>)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('should count all <p> tags', () => {
    const wrapper = shallow(<MembersList />)
    expect(wrapper.find('p').length).toEqual(8)
  })
})
