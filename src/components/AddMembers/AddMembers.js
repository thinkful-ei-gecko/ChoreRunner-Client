import React from 'react';
import TokenService from '../../services/token-service';
import config from '../../config';
import ApiService from '../../services/api-service'
import HouseholdContext from '../../contexts/HouseHoldContext';

export default class AddMembers extends React.Component {
  state = {
    name: '',
    username: '',
    password: '',
    household_id: this.context.households.id || '', 
    error: null,
    validateError: {
      usernameError: '',
      passwordError:'',
    }
  }
  static contextType = HouseholdContext

  validate = () => {
    const { password } = this.state;
    let username = this.state.username.trim()
    let usernameError = '';
    let passwordError = '';

    // Validates child's username
    if(username.length > 50) {
      usernameError = 'Your name must be less than 50 characters';
    }

    //Validates the password
    if (password.length <= 3) {
      passwordError = 'Password must be 4 characters or more';
    }
    if (password.length >= 11) {
      passwordError = 'Password be less than 10 characters';
    }
    if (password.startsWith(' ') || password.endsWith(' ')) {
      passwordError = 'Password must not start or end with empty spaces';
    }

    if(usernameError || passwordError) {
      this.setState({ validateError: { usernameError, passwordError } })
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
    const householdId = this.state.household_id
    console.log(householdId)
    if (householdId === '') {
      this.setState({
        error: "Please select a household"
      })
    }
    let newMember = {
      name: this.state.name,
      username: this.state.username,
      password: this.state.password,
      household_id: householdId
    }
    if(isValid) {
      // fetch(`${config.API_ENDPOINT}/households/${this.state.household_id}/members`, {
      //   method: 'POST',
      //   headers: {
      //     'content-type': 'application/json',
      //     'authorization': `bearer ${TokenService.getAuthToken()}`
      //   },
      //   body: JSON.stringify(newMember)
      // })
      // .then(res =>
      //   (!res.ok)
      //     ? res.json().then(e => Promise.reject(e))
      //     : res.json()
      // )
      ApiService.addHouseholdMember(householdId, newMember)
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
      .catch(res => this.setState({ error: res.error, household_id: '' }))
      document.getElementById("add-household-form").reset();
    }
  }


  render() {
    const { households } = this.context
    const { error } = this.state;
    const { usernameError, passwordError } = this.state.validateError;
    return (

      <div className="add-member container">
        <p>ADD HOUSEHOLD MEMBERS:</p>
        <form onSubmit={this.handleSubmit} id="add-household-form" className="add-household-form">
          <label htmlFor="member-name">Name</label>
          <input type="text" id="member-name" name="name" required onChange={this.onChangeHandle} value={this.state.name}></input>
          {/* <div role='alert'>
            {error && <p className='alertMsg'>{error}</p>}
          </div> */}
          <label htmlFor="household">Household</label>
          <select className='select-css' type="text" id="assignee" name="household_id" onChange={this.onChangeHandle} defaultValue="Select household" required>
            <option disabled>Select household</option>
            {households.map((hh, index) => <option key={index} value={hh.id}>{hh.name}</option>)}
          </select>
          <label htmlFor="child-username">Child username</label>
          <input type="text" id="child-username" name="username" required onChange={this.onChangeHandle} value={this.state.username}></input>
          {/* <div role="alert">
            <p className='alertMsg'>{usernameError || error}</p>
          </div> */}
          <label htmlFor="child-password">Child password</label>
          <input type="password" id="child-password" name="password" required onChange={this.onChangeHandle} value={this.state.password}></input>
          <div role="alert">
            <p className='alertMsg'>{error}</p>
            <p className='alertMsg'>{usernameError}</p>
            <p className='alertMsg'>{passwordError}</p>
          </div>
          {/* {<><p>{error}</p><p>{usernameError}</p><p>{passwordError}</p></>} */}
          <button type="submit" className="submitHH">add</button>
        </form>
        
      </div>

    )
  }
}