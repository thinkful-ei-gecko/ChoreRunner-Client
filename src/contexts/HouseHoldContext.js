import React, { Component } from 'react';
import ApiService from '../services/api-service';

const HouseholdContext = React.createContext({
  households: [],
  setHouseholds: () => {},
});

export default HouseholdContext;

export class HouseholdProvider extends Component {
  state = {
    households:[],
  };

  setHouseholds = households => {
    this.setState({
      households,
    });
  };

  render() {
    const value = {
      households: this.state.households,
      setHouseholds: this.setHouseholds,
    };
    return (
      <HouseholdContext.Provider value={value}>
        {this.props.children}
      </HouseholdContext.Provider>
    );
  }
}
