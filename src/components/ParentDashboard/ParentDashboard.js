import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import HouseholdContext from '../../contexts/HouseHoldContext'
import ApiService from '../../services/api-service.js'
import AddMembers from '../AddMembers/AddMembers';
import './ParentDashboard.css'


export default class ParentDashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      household: [],
      editHousehold: false,
      editName: '',
      editId: '',
      members: {}
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
  hasHouseholds = () => {
    return !this.context.households.length === 0
  }

  //Boolean check for if there are members
  hasMembers = () => {
    return this.state.members !== {}
  }

  //Returns appropriate feedback if the user has no households.
  // renderUserFeedback() {
  //   if (!this.hasHouseholds()) {
  //     return (<p>To get started, use the Add Households form to create a household (Maybe you have more than one!).</p>)
  //   }
  //   else if (this.hasHouseholds() && !this.hasMembers()) {
  //     return (<p>It looks like you have Households, but no members assigned. Use the Add Members form to populate each household with your family members.</p>)
  //   } else {
  //     return (<p>Click on a Household to begin assigning tasks to family members!</p>)
  //   }
  // }

  handleRenderAfterAddMember = res => {
    console.log('THIS IS MEMBERS', this.state.members)
    console.log('this is new member', res)
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
      [e.target.name]: e.target.value
    })
  }

  handleHouseholdSubmit = e => {
    e.preventDefault();
    let name = e.target.householdName.value;
    ApiService.postHousehold(name)
      .then(res => {
        this.context.addHousehold(res)
        this.householdName.value = '';
      })
      .catch(error => console.log(error));
  }

  //Toggles whether or not to show the household form.
  toggleEditHousehold = () => {
    this.setState({ editHousehold: !this.state.editHousehold })
  }

  //Sets data of household being edited.
  onEditHouseholdClick = household => {
    this.setState({ editName: household.name, editId: household.id })
  }

  //Clears edit form
  clearEditHousehold = () => {
    this.setState({ name: '', editName: '', editId: '' })
  }

  handleEditHouseholdName = householdId => {
    let name = this.state.name;
    let user_id = this.state.user_id

    const newHousehold = {
      id: householdId,
      name,
      user_id
    }

    ApiService.editHouseholdName(householdId, newHousehold)
      .then(res => this.context.setHouseholds(res))
      .catch(this.context.setError)

    //Clear data and remove form.
    this.clearEditHousehold();
    this.toggleEditHousehold();
  }


  renderEditHousehold = () => {
    const { households } = this.context;
    return (
      <span>
        <input
          className="update-household"
          type="text"
          name="name"
          value={households.name}
          placeholder="name"
          onChange={this.onChangeHandle}
        />
        <button onClick={() => this.handleEditHouseholdName(this.state.id)}>Save</button>
      </span>
    )
  }

  //Show household edit button
  renderEditHouseholdButton() {
    return (
      <button
        onClick={this.toggleEditHousehold()}>
        Edit
      </button>
    )
  }

  renderHouseholds = () => {
    const { households, deleteHousehold } = this.context;
    return households.map((household) => {
      return (
        <div key={household.id} className="house_card">
          <Link to={`/household/${household.id}`} style={{ textDecoration: 'none' }}>
            <p >{household.name}</p>
          </Link>
          <div className='buttons-container'>
            <button className="delete-household" onClick={event => deleteHousehold(event, household.id)}> Delete </button>
            {
              //If editing and this household is the one being edited, render form, otherwise render the button.
              this.state.editHousehold && household.id === this.state.editId
                ? this.renderEditHousehold()
                : this.renderEditHouseholdButton()
            }
          </div>
          {this.state.members && this.state.members[household.id] ?
            <ul>
              {this.state.members[household.id].members.map(member => {
                return <li key={member.id}>{member.name}</li>
              })}
            </ul>
            : null}
        </div>
      );
    });
  }

  render() {
    // const { households } = this.context;
    return (
      <section className="parent_dashboard">
        <div className="parent_dashboard-feedback">
          <h3>Welcome to ChoreRunner!</h3>
          {/* {this.renderUserFeedback()} */}
        </div>
        <h2>PARENT DASHBOARD</h2>
        <div className="add-household container">
          <form
            className="add-household-form"
            onSubmit={this.handleHouseholdSubmit}
          >
            <label htmlFor="householdName"> ADD HOUSEHOLD:</label>
            <input name="householdName" type="text" required ref={input => this.householdName = input}></input>
            <button className="submitHH" type="submit">
              Add New Household
            </button>
          </form>
        </div>
        <div className='household-details container'>
          <AddMembers handleRenderUpdate={this.handleRenderAfterAddMember} />
        </div>
        <div className="household_buttons">
          {this.renderHouseholds()}
        </div>
      </section>
    );
  }
}
