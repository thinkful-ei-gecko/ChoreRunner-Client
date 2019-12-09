import React from 'react';
import TokenService from '../../services/token-service';
import config from '../../config';
import HouseholdContext from '../../contexts/HouseHoldContext';

export default class AddMembers extends React.Component {
  state = {
    name: '',
    username: '',
    password: '',
    household_id: this.context.households.id || '', 
    error: null
  }
  static contextType = HouseholdContext

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.household_id === '') {
      this.setState({
        error: "Please select a household"
      })
    }
    let newMember = {
      name: this.state.name,
      username: this.state.username,
      password: this.state.password,
      household_id: this.state.household_id
    }
    fetch(`${config.API_ENDPOINT}/households/${this.state.household_id}/members`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(newMember)
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
      .then(member => {
        this.setState({
        name: '',
        username: '',
        password: '',
        household_id: 'Select household',
        error: null
        })
        this.props.handleRenderUpdate(member);
      })
  }

  handleNameChange = e => {
    this.setState({
      name: e.target.value
    })
  }

  handleHouseholdChange = e => {
    this.setState({
      household_id: e.target.value
    })
  }

  handleChildUsernameChange = e => {
    this.setState({
      username: e.target.value
    })
  }

  handleChildPasswordChange = e => {
    this.setState({
      password: e.target.value
    })
  }

  render() {
    const { households } = this.context
    return (

      <div className="add-member container">
        <p>ADD HOUSEHOLD MEMBERS:</p>
        <form onSubmit={this.handleSubmit} className="add-household-form">
          <label htmlFor="member-name">Name</label>
          <input type="text" id="member-name" required onChange={this.handleNameChange} value={this.state.name}></input>
          <label htmlFor="household">Household</label>
          <select className='select-css' type="text" id="assignee" onChange={this.handleHouseholdChange} defaultValue="Select household" required>
            <option disabled>Select household</option>
            {households.map((hh, index) => <option key={index} value={hh.id}>{hh.name}</option>)}
          </select>
          <label htmlFor="child-username">Child username</label>
          <input type="text" id="child-username" required onChange={this.handleChildUsernameChange} value={this.state.username}></input>
          <label htmlFor="child-password">Child password</label>
          <input type="password" id="child-password" required onChange={this.handleChildPasswordChange} value={this.state.password}></input>
          <button type="submit" className="submitHH">add</button>
        </form>
        {<p>{this.state.error}</p>}
      </div>

    )
  }
}