import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import HouseholdContext from '../../contexts/HouseHoldContext'
import EditHouseholdInput from '../EditHouseholdInput/EditHouseholdInput'
import ApiService from '../../services/api-service.js'
import AddMembers from '../AddMembers/AddMembers';
import './ParentDashboard.css'


export default class ParentDashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      household: [],
      editingHousehold: false,
      id: null,
      members: {},
      submitFeedback: ''
    }
  }

  static contextType = HouseholdContext;

  componentDidMount() {

    ApiService.getHouseholds()
      .then(res => {
        this.context.setHouseholds(res);
      })
      .catch(error =>
        this.setState({
          error: error,
        })
      )

    ApiService.getMembersAndHouseholds()
      .then(res => {
        this.setState({ members: res });
      })
      .catch(error =>
        this.setState({
          error: error,
        })
      )
  }

  //Boolean check for if there are households
  hasHouseholds = () => this.context.households.length !== 0;

  //Returns appropriate feedback if the user has no households.
  renderUserFeedback() {
    // const { households } = this.context;
      return (
        <>
          <p>1. Add Households form to create your households.</p>
          <p>2. Add Members to your household</p>
          <p>3. Manage your households tasks by clicking <span>'See Household'</span> </p>
        </>
      )
  }

  handleRenderAfterAddMember = res => {
    // console.log('THIS IS MEMBERS', this.state.members)
    // console.log('this is new member', res)
    if (this.state.members[res.household_id]) {
      let members = this.state.members;
      members[res.household_id].members =
        [...members[res.household_id].members, { 'name': res.name, 'id': res.id }]
      this.setState({
        members: members
      })
    } else {
      let members = this.state.members;
      members[res.household_id] = { 'household_id': res.household_id, 'members': [{ 'name': res.name, 'id': res.id }] }
      this.setState({
        members: members
      })
    }
  }

  onChangeHandle = e => {
    this.setState({
      name: e.target.value
    })
  }
  handleCancel = () => {
    this.setState({
      editingHousehold: false
    })
  }

  handleHouseholdSubmit = e => {
    e.preventDefault();
    let name = e.target.householdName.value;
    ApiService.postHousehold(name)
      .then(res => {
        //Set form feedback to show successful household add and clear add input.
        this.context.addHousehold(res)
        this.setState({ submitFeedback: `${this.householdName.value} Household Added! Now Add Members!` })
        clearInterval()
        this.householdName.value = '';
        this.render();
      })
      .catch(error => {
        //Set form feedback to error on failure
        this.setState({ submitFeedback: error });
        console.log(error)
      });
  }

  //Toggles whether or not to show the household form.
  toggleEditHousehold = () => {
    this.setState({ editingHousehold: !this.state.editingHousehold })
  }

  //Sets data of household being edited.
  // handleEditHouseholdClick = household => {
  //   console.log('Before: ', this.state.editName, this.state.editId);
  //   this.setState({ editName: household.name, editId: household.id })
  //   console.log('After: ', this.state.editName, this.state.editId);

  //   this.toggleEditHousehold();
  //   this.render();
  // }

  //Clears edit form state
  // clearEditHousehold = () => {
  //   this.setState({ name: '', editName: '', editId: '' })
  // }

  handleEditHouseholdName = (householdId, name) => {
    console.log('----------houseid',householdId, name)
    // let name = this.state.name;
    let user_id = this.state.user_id

    const newHousehold = {
      id: householdId,
      name,
      user_id
    }

    ApiService.editHouseholdName(householdId, newHousehold)
      .then(res => this.context.setHouseholds(res))
      .catch(this.context.setError)

    this.setState({ editingHousehold: false })
  }

  onChangeHandle = e => {
    console.log('IN ONCHANGE', e.target.value,e.target.name)
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  renderHouseholds = () => {
    console.log('IN RENDERHOUSEHOLDS')
    const { households, deleteHousehold } = this.context;
    return households.map((household) => {
      console.log('IN the map', household)
      return (
        <div key={household.id} className="house_card">
          {/*TODO: move textDecoration to css and remove from style*/}
           <div className='buttons-container'>
            <Link className='see-dash' to={`/household/${household.id}`} style={{ textDecoration: 'none' }}>See Household</Link>
            <button onClick={() => this.setState({ editingHousehold: true, editId: household.id })}><FontAwesomeIcon className='pen-icon' icon={faPencilAlt} size="1x" color=" #b1b1b1"/></button>
            <button className="delete-household" onClick={event => deleteHousehold(event, household.id)}> <FontAwesomeIcon className='trash-icon' icon={faTrashAlt} size="1x" color=" #b1b1b1"/> </button>
          </div>
          <div className='card-info'>
              <p><span>{household.name}</span></p>
              {
              this.state.editingHousehold && household.id === this.state.editId
                ? <EditHouseholdInput
                    name={household.name}
                    edit={this.state.editingHousehold}
                    handleEditHouseholdName={this.handleEditHouseholdName}
                    handleCancel={this.handleCancel}
                    id={household.id}
                />
                 : null
            }
            {this.state.members && this.state.members[household.id] ?
              <ul>
                {this.state.members[household.id].members.map(member => {
                  return <li key={member.id}>{member.name}</li>
                })}
              </ul>
              : <ul><li>
                It looks like this household has no members yet! <span><a style={{ textDecoration: 'none' }} href={'#add-member'}>Add Household Members</a></span>.
                </li></ul>}
          </div>
        </div>
      );
    });
  }

  render() {
    // const { households } = this.context;
    // console.log(!!households.length)
    return (
      <section className="parent_dashboard">
        <div className="parent_dashboard-feedback">
          <h3>Get Started!</h3>
          {/* {!!households.length
          ?
          null :*/}
         { this.renderUserFeedback()}
        </div>
        <div className='add-forms-container'>
          <div className="add-household container">
            <form
              className="add-household-form"
              onSubmit={this.handleHouseholdSubmit}
            >
              <label className='add-house-label' htmlFor="householdName"> ADD HOUSEHOLD:</label>
              <input name="householdName" type="text" required ref={input => this.householdName = input}></input>
              <button className="submitHH" type="submit">
                + add new household
              </button>
              {/*Shows success feedback when household submitted successfully*/}
              {!!this.state.submitFeedback
                ? < div className="household-add-form-feedback">
                  {this.state.submitFeedback}
                </div>
                : null
              }
            </form>
          </div>
          <div className='household-details container'>
            <AddMembers handleRenderUpdate={this.handleRenderAfterAddMember} />
          </div>
        </div>
        <div className="household_buttons">
          {this.renderHouseholds()}
        </div>
      </section >
    );
  }
}

// //Household edit input takes callback and household as props.
// function EditHouseholdInput(props) {
//   const { household, onChangeHandle, handleEditHouseholdName } = this.props;
//   return (
//     <span>
//       <input
//         className="update-household"
//         type="text"
//         name="name"
//         value={household.name}
//         placeholder="name"
//         onChange={onChangeHandle}
//       />
//       <button onClick={() => handleEditHouseholdName(this.state.editId)}>Save</button>
//     </span>
//   )
// }

// //Household edit button takes callback and household as props
// function EditHouseholdButton() {
//   const { household, handleEditHouseholdClick } = this.props;
//   return (
//     <button
//       onClick={() => handleEditHouseholdClick(household)}>
//       Edit
//     </button>
//   )
// }