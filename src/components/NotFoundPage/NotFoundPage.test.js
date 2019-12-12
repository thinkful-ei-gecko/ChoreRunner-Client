import React from 'react';
import ReactDOM from 'react-dom';
import NotFoundPage from './NotFoundPage';
import {MemoryRouter} from 'react-router-dom';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json'

describe.only('NotFoundPage component testing', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
  
    ReactDOM.render(<MemoryRouter><NotFoundPage /></MemoryRouter>, div);
  
    ReactDOM.unmountComponentAtNode(div);
  });
  
  it('renders UI as expected', () => {
    const tree = renderer
        .create(<MemoryRouter><NotFoundPage /></MemoryRouter>)
        .toJSON();
        expect(tree).toMatchSnapshot();
  })

  it('renders empty given no tabs', () => {
    const wrapper = shallow(<NotFoundPage />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
