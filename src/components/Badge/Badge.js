import React, { Component } from 'react';
import ApiService from '../../services/api-service';
//THIS MIGHT NOT BE NECESSARY, DEPENDING ON OUR REFACTORING OF ENDPOINTS.
//AT THE VERY LEAST, THE REQUESTED ENDPOINT WILL NEED TO BE CHANGED.

export default class Badge extends Component {
  state = {
    levelInfo: {},
  };

  
  componentDidMount() {
    ApiService.getBadge().then(res => {
      this.setState({ levelInfo: res });
    });
  }

  render() {
    const {levelInfo} = this.state
    return (
      <section className="levelInfo">
        <div className="badge">{levelInfo.badge}</div>
        <div className="level">Level: {levelInfo.level_id}</div>
        <div className="totalScore">Total Score: {levelInfo.total_score}</div>
        <div className="NextLevel">To next level: {levelInfo.nextLevel}</div>
      </section>
    );
  }
}
