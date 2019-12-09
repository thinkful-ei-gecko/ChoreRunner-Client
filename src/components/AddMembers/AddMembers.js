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
    error: null,
    nameError: ''
  }
  static contextType = HouseholdContext

  validate = () => {
    let nameError = '';

    if(this.state.name.length <= 3) {
      nameError = 'Please enter more characters'
    }

    if(nameError) {
      this.setState({ nameError })
      return false;
    }
    return true;
  }

  onChangeHandle = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    let isValid = this.validate();
    console.log(this.state.household_id)
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
    // if(isValid) {
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
      document.getElementById("add-household-form").reset();
     //}
  }


  render() {
    const { households } = this.context
    const nameError = this.state.nameError;
    return (

      <div className="add-member container">
        <p>ADD HOUSEHOLD MEMBERS:</p>
        <form onSubmit={this.handleSubmit} id="add-household-form" className="add-household-form">
          <label htmlFor="member-name">Name</label>
          <input type="text" id="member-name" name="name" required onChange={this.onChangeHandle} value={this.state.name}></input>
          <div className="valid-error">{nameError}</div>
          <label htmlFor="household">Household</label>
          <select className='select-css' type="text" id="assignee" name="household_id" onChange={this.onChangeHandle} defaultValue="Select household" required>
            <option disabled>Select household</option>
            {households.map((hh, index) => <option key={index} value={hh.id}>{hh.name}</option>)}
          </select>
          <label htmlFor="child-username">Child username</label>
          <input type="text" id="child-username" name="username" required onChange={this.onChangeHandle} value={this.state.username}></input>
          <label htmlFor="child-password">Child password</label>
          <input type="password" id="child-password" name="password" required onChange={this.onChangeHandle} value={this.state.password}></input>
          <button type="submit" className="submitHH">add</button>
        </form>
        {<p>{this.state.error}</p>}
      </div>

    )
  }
}