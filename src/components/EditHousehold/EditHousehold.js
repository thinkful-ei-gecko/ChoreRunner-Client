import React, { Component } from 'react';
import ApiService from '../../services/api-service';
import HouseHoldContext from '../../contexts/HouseHoldContext'

export default class EditHousehold extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      user_id: '',
    }
  }

  static contextType = HouseHoldContext

  onChangeHandle = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleEditHousehold = e => {
    e.preventDefault();
    const { id } = this.props.match.params;
    let name = this.state.name;
    let user_id = this.state.user_id

    const newHousehold = {
      id,
      name,
      user_id
    }
  }

  componentDidMount() {
    //const { id } = this.props.match.params;
    console.log(this.props.match.params.id)

    ApiService.getHousehold(id)
      .then(res => {
        this.setState({
          name: res.name,
          user_id: res.user_id
        })
      })
      .catch(err => console.error(`${err.message}`))
    
    ApiService.getHouseholds()
      .then(this.context.setHouseholds)
      .catch(this.context.setError)
  }

  render() {
    const { name } = this.state;

    return (
      <form onSubmit={this.handleEditHousehold}>
        <label>
          Edit Household Name
        </label>
        <input 
          type="text"
          name="name"
          placeholder="Household Name"
          onChange={this.onChangeHandle}
          value={name}
        />
      </form>
    )
  }
}