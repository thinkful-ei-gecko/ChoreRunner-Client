import React from 'react';
import ReactDOM from 'react-dom';
import EditMember from './EditMember';
import {MemoryRouter} from 'react-router-dom';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json'

describe.skip('EditMember component testing', () => {

  // const props = {
  //   state: {
  //     id: 1,
  //     name: '',
  //     username: '',
  //     password: '',
  //     editMember: '',
  //     nameError: '',
  //   },
  // }

  function createTestProps(props) {
    return {
      id: 1,
      name: '',
      username: '',
      password: '',
      editMember: '',
      nameError: '',
      ...props
    }
  }

  let wrapper, props;

  beforeEach(() => {
    props = createTestProps()
    wrapper = shallow(<EditMember {...props} />)
  })

  it.skip('renders without crashing', () => {
    const div = document.createElement('div');
  
    ReactDOM.render(
    <MemoryRouter>
      <EditMember 
        {...props}
      />
      </MemoryRouter>, div);
  
    ReactDOM.unmountComponentAtNode(div);
  });
  
  it.skip('renders UI as expected', () => {
    const tree = renderer
        .create(<MemoryRouter><EditMember /></MemoryRouter>)
        .toJSON();
        expect(tree).toMatchSnapshot();
  })

  it('renders empty given no tabs', () => {
    wrapper = shallow(<EditMember {...props}/>)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
