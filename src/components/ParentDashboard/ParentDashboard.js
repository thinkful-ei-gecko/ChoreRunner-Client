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
  }


  handleAddMember = e => {
    e.preventDefault();
    let name = e.target.memberName.value;
    let username = e.target.username.value;
    let password = e.target.memberPassword.value;
    let household_id = e.target.household.value;
    let newMember = {
      name,
      username,
      password,
      household_id,
    }
    ApiService.addMember(newMember, household_id)
      .then(res => {
        this.context.addMember(res)
        //want to push to the context array with the added member. 
        console.log(res)
      })
      .catch(error => console.log(error))
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

  renderOptions = () => {
    const { households } = this.context;
    return households.map(house => {
      return (
        <option key={house.householdId} value={house.householdId}>
          {house.housename}
        </option>
      );
    });
  }


  renderHouseholds = () => {
    const { name } = this.state;
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
        </div>
      );
    });
  }

  render() {
    const { households } = this.context;
    // console.log(this.state.id)
    console.log('THIS IS CONTEXT ----', households)
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
          <AddMembers />
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
