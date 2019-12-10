import React from 'react';
import ReactDOM from 'react-dom';
import { Input } from './Form';
import {MemoryRouter} from 'react-router-dom';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json'

describe('Form component testing', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
  
    ReactDOM.render(<MemoryRouter><Input /></MemoryRouter>, div);
  
    ReactDOM.unmountComponentAtNode(div);
  });
  
  it('renders UI as expected', () => {
    const tree = renderer
        .create(<MemoryRouter><Input /></MemoryRouter>)
        .toJSON();
        expect(tree).toMatchSnapshot();
  })

  it('renders empty given no tabs', () => {
    const wrapper = shallow(<Input />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
