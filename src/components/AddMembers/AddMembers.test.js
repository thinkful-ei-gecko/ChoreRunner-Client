import React from 'react';
import { shallow } from 'enzyme'
import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom'
import toJson from 'enzyme-to-json'
import AddMembers from './AddMembers'
import renderer from 'react-test-renderer';
import enzyme from 'enzyme'

describe('AddMembers component', () => {
  
  it('renders an .AddMembers by default', () => {
    const wrapper = shallow(<AddMembers />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <BrowserRouter>
        <AddMembers />
      </BrowserRouter>
    , div);
    ReactDOM.unmountComponentAtNode(div);
  })

  it('renders UI as expected', () => {
    const tree = renderer
      .create(<AddMembers />)
      .toJSON();
      expect(tree).toMatchSnapshot();
  })

  it('should trigger onChange event', () => {
    let changeText = 'text';
    const wrapper = enzyme.shallow(<AddMembers onChange={(value) => changeText = value} />)
    wrapper.find('input[name="text"]').simulate('change', { target: {value: 'text'}});
    expect(changeText).toEqual('text')
  })
})