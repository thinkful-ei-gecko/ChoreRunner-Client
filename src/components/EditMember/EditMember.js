import React from 'react';
import ApiService from '../../services/api-service';
import HouseHoldContext from '../../contexts/HouseHoldContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

export default class EditMember extends React.Component {
  static contextType = HouseHoldContext
  state = {
    id: this.props.member.member_id,
    name: this.props.member.name,
    username: this.props.member.username,
    password: '',
    editMember: this.props.editMember,
    nameError: '',
  };

  onChangeHandle = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  validate = () => {
    let nameError = '';

    if (this.state.name.length <= 3) {
      nameError = 'Please enter more characters'
    }

    if (nameError) {
      this.setState({ nameError })
      return false;
    }
    return true;
  }

  handleSubmit = e => {
    e.preventDefault();
    const { toggleEditMember, updateMembersList } = this.props;
    let isValid = this.validate();
    let household_id = this.props.household_id;
    let updatedMember = {
      id: this.state.id,
      name: this.state.name,
      username: this.state.username,
      password: this.state.password,
    };

    if (isValid) {
      ApiService.editMember(updatedMember, household_id, this.state.id).then(res => {
        let newMember = res[0]
        return newMember
      })
        //I added the return and this 'then' to ensure the component rerenders with the new info.
        .then(newMember => {
          updateMembersList(newMember)
          toggleEditMember()
        })
        .catch(error => this.context.setError(error))
      document.getElementById("add-household-form").reset();
    }

  };

  // handleNameChange = e => {
  //   this.setState({
  //     name: e.target.value,
  //   });
  // };

  // handleChildUsernameChange = e => {
  //   this.setState({
  //     username: e.target.value,
  //   });
  // };

  // handleChildPasswordChange = e => {
  //   this.setState({
  //     password: e.target.value,
  //   });
  // };

  renderFormButton() {
    const { toggleEditMember } = this.props;
    return (
      <button onClick={() => toggleEditMember()}>
        <FontAwesomeIcon icon={faPencilAlt} size="2x" color="green"/>
      </button>
    );
  }

  renderForm() {
    let nameError = this.state.nameError;
    return (
      <div className="add-member container">
        <p>Edit member</p>
        <form onSubmit={this.handleSubmit} id="add-household-form" className="add-household-form">
          <label htmlFor="member-name">Name</label>
          <input
            type="text"
            id="member-name"
            name="name"
            value={this.state.name}
            onChange={this.onChangeHandle}
          ></input>
          <div className="valid-error">{nameError}</div>
          <label htmlFor="child-username">Child username</label>
          <input
            type="text"
            id="child-username"
            name="username"
            value={this.state.username}
            onChange={this.onChangeHandle}
          ></input>
          <label htmlFor="child-password">Child password</label>
          <input
            type="password"
            id="child-password"
            name="password"
            onChange={this.onChangeHandle}
          ></input>
          <button type="submit" className="submitHH">
            submit changes
          </button>
          {/* <button onClick={() => this.props.handleDeleteMember(this.state.id)}>
            Delete
          </button> */}
          {this.context.error ? <p>{this.context.error.error}</p> : null}
        </form>
      </div>
    );
  }

  render() {
    return (
      <>
        {!!this.props.editMember ? (
          <>{this.renderForm()}</>
        ) : (
            <>{this.renderFormButton()}</>
          )}
      </>
    );
  }
}
