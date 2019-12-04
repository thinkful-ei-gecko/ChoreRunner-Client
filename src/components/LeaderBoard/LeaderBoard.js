import React, { Component } from 'react';
import HouseholdContext from '../../contexts/HouseHoldContext';
import ApiService from '../../services/api-service.js';
import './LeaderBoard.css';

export default class Leaderboard extends Component {
  static contextType = HouseholdContext;

  state = {
    members: [
      { name: 'Daniel', total_score: 45 },
      { name: 'Kelley', total_score: 32 },
    ],
  };

  // componentDidMount() {
  //   ApiService.getMemberScores()
  //     .then(res => {
  //       this.setState({ members: res });
  //     })
  //     .catch(error => this.context.setError(error));
  // }

  renderScores() {
    let members = this.state.members;
    return members.map(member => {
      return (
        <li className="score_display">
          <div className="name_col">
            <span>{member.name}</span>
          </div>
          <div className="score_col">
            <span>{member.total_score}</span>
          </div>
        </li>
      );
    });
  }

  render() {
    return (
      <section className="leader_board">
        <h3>Leaderboard</h3>
        <div className="headerRow">
          <div className="header_rank">
            <span>Rank</span>
          </div>
          <div className="header_name">
            <span>Member Name</span>
          </div>
          <div className="header_score">
            <span>Score</span>
          </div>
        </div>
        <ol>{this.renderScores()}</ol>
      </section>
    );
  }
}
