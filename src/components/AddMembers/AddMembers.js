import React from 'react';
import TokenService from '../../services/token-service';
import config from '../../config'

export default class AddMembers extends React.Component {
  state = {
    name: '',
    username: '',
    password: '',
    household_id: ''
  }

  handleSubmit = e => {
    e.preventDefault();
    let newMember = {
      name: this.state.name,
      username: this.state.username,
      password: this.state.password,
      household_id: this.state.household_id
    }
    fetch(`${config.API_ENDPOINT}/members`, {
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
      .then(member => console.log('in addmember', member))
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
    return(
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="member-name">Name</label>
        <input type="text" id="member-name" required onChange={this.handleNameChange}></input>
        <label htmlFor="household">Household</label>
        <select type="text" id="assignee" required onChange={this.handleHouseholdChange}>
          {this.props.households.map((hh, index) => <option key={index} value={hh.id}>{hh.name}</option>)}
        </select>
        <label htmlFor="child-username">Child username</label>
        <input type="text" id="child-username" required onChange={this.handleChildUsernameChange}></input>
        <label htmlFor="child-password">Child password</label>
        <input type="password" id="child-password" required onChange={this.handleChildPasswordChange}></input>
        <button type="submit">Add child</button>
      </form>
    )
  }
}