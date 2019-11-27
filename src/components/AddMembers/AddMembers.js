import React from 'react';
import config from '../../config';
import TokenService from '../../services/token-service';
import HouseholdContext from '../../contexts/HouseHoldContext'

export default class AddMembers extends React.Component {
  
  static contextType = HouseholdContext;
  render() {
    console.log(this.context.household)
    return(
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="member-name">Name</label>
        <input type="text" id="member-name" required onChange={this.handleNameChange}></input>
        <label htmlFor="household">Household</label>
        <select type="text" id="assignee" required onChange={this.handleHouseholdChange}>
          {/* {this.props.members.map((member, index) => <option key={index}>{member.name}</option>)} */}
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