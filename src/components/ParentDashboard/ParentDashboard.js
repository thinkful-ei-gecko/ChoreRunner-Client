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
      editName: false,
      id: null,
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
      this.setState({members: res});
    })
    .catch(error =>
      this.setState({
        error: error,
      })
    )
  }

  handleRenderAfterAddMember = res => {
    let members = this.state.members;
    members[res.household_id].members =
      [...members[res.household_id].members, {'name': res.name, 'id' : res.id}]
    this.setState({
      members: members
    })
     
  }

  handleHouseholdSubmit = e => {
    e.preventDefault();
    let name = e.target.householdName.value;
    ApiService.postHousehold(name)
      .then(res => {
        this.context.addHousehold(res)
      })
      .catch(error => console.log(error));
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

    this.setState({ editName: false })
  }

  onChangeHandle = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
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
            <button onClick={() => this.setState({ editName: true, id: household.id })}>Edit</button>
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
    const { households } = this.context;
    return (
      <section className="parent_dashboard">
        <h2>PARENT DASHBOARD</h2>
        <div className="add-household container">
          <form
            className="add-household-form"
            onSubmit={this.handleHouseholdSubmit}
          >
            <label htmlFor="householdName"> ADD HOUSEHOLD:</label>
            <input name="householdName" type="text" required></input>
            <button className="submitHH" type="submit">
              add
            </button>
          </form>
        </div>
        <div className='household-details container'>
          <AddMembers handleRenderUpdate={this.handleRenderAfterAddMember}/>
        </div>
        <div className="household_buttons">
          {this.renderHouseholds()}
          {
            this.state.editName
              ?
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
              :
              <span></span>
          }
        </div>
      </section>
    );
  }
}
