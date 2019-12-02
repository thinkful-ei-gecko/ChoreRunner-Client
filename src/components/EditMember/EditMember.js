import React from 'react';
import TokenService from '../../services/token-service';
import config from '../../config';
import HouseholdContext from '../../contexts/HouseHoldContext';
import ApiService from '../../services/api-service';

export default class EditMember extends React.Component {
  state = {
    id: '',
    name: '',
    username: '',
    password: '',
    editing: false,
  };

  handleSubmit = e => {
    e.preventDefault();
    let household_id = this.props.household_id;
    let updatedMember = {
      id: 9, //we need to be able to get the id from props or eslewhere.
      name: this.state.name,
      username: this.state.username,
      password: this.state.password,
    };
    console.log('this is the newInfo', updatedMember);
    console.log('this is the hID', household_id);

    ApiService.editMember(updatedMember, household_id).then(res => {
      console.log(res)
      this.props.updateMember(res[0]);
      this.setState({editing : false})
    });
  };

  handleNameChange = e => {
    this.setState({
      name: e.target.value,
    });
  };

  handleChildUsernameChange = e => {
    this.setState({
      username: e.target.value,
    });
  };

  handleChildPasswordChange = e => {
    this.setState({
      password: e.target.value,
    });
  };

  renderFormButton() {
    return (
      <button onClick={() => this.setState({ editing: true })}>
        Edit Member
      </button>
    );
  }

  renderForm() {
    return (
      <div className="add-member container">
        <p>Edit Member</p>
        <form onSubmit={this.handleSubmit} className="add-household-form">
          <label htmlFor="member-name">Name</label>
          <input
            type="text"
            id="member-name"
            value={this.state.name}
            required
            onChange={this.handleNameChange}
          ></input>
          <label htmlFor="child-username">Child username</label>
          <input
            type="text"
            id="child-username"
            value={this.state.username}
            required
            onChange={this.handleChildUsernameChange}
          ></input>
          <label htmlFor="child-password">Child password</label>
          <input
            type="password"
            id="child-password"
            required
            onChange={this.handleChildPasswordChange}
          ></input>
          <button type="submit" className="submitHH">
            submit changes
          </button>
        </form>
      </div>
    );
  }

  render() {
    return (
      <>
        {this.state.editing === true ? (
          <>{this.renderForm()}</>
        ) : (
          <>{this.renderFormButton()}</>
        )}
      </>
    );
  }
}
