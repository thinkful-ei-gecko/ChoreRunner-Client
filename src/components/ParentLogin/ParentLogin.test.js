import React from 'react';
import ReactDOM from 'react-dom';
import ParentLogin from './ParentLogin';
import {MemoryRouter} from 'react-router-dom';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json'
import sinon from 'sinon'

describe('ParentLogin component testing', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(<MemoryRouter><ParentLogin /></MemoryRouter>, div);

    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders UI as expected', () => {
    const tree = renderer
        .create(<MemoryRouter><ParentLogin /></MemoryRouter>)
        .toJSON();
        expect(tree).toMatchSnapshot();
  })

  it('renders empty given no tabs', () => {
    const wrapper = shallow(<ParentLogin />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('responds to onChange event', () => {
    const event = { target: { name: 'text', value:'test' } }
    const wrapper = mount(<ParentLogin />)
    const changeSpy = sinon.spy(wrapper.instance(), "onChangeHandle")
    wrapper.update()
    wrapper.find('input[name="username"]').simulate('change', event);
    expect(changeSpy.calledOnce).toEqual(false)
  })
})