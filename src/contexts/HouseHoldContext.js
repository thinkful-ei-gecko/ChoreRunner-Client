import React, { Component } from 'react';
import ApiService from '../services/api-service';

const HouseholdContext = React.createContext({
  households: [],
  memberTasks: [],
  error: null,
  setHouseholds: () => {},
  addHousehold: () => {},
  setError: () => {},
});

export default HouseholdContext;

export class HouseholdProvider extends Component {
  state = {
    households:[],
    memberTasks: [],
    error: null,
  };

  setHouseholds = households => {
    this.setState({
      households,
    });
  };

  addHousehold = newHousehold => {
    this.setHouseholds([...this.state.households, newHousehold]);
  };

  setMemberTasks = memberTasks => {
    this.setState({
      memberTasks
    });
  }

  setError = error => {
    this.setState({error})
  }

  render() {
    const value = {
      households: this.state.households,
      memberTasks: this.state.memberTasks,
      error: this.state.error,
      setHouseholds: this.setHouseholds,
      setMemberTasks: this.setMemberTasks,
      addHousehold: this.addHousehold,
      setError: this.setError
    };
    
    return (
      <HouseholdContext.Provider value={value}>
        {this.props.children}
      </HouseholdContext.Provider>
    );
  }
}
