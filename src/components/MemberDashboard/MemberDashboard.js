import React, { Component } from 'react';
//Removed Link because it was not being used.
import HouseholdContext from '../../contexts/HouseHoldContext';
import ApiService from '../../services/api-service.js';
import './MemberDashboard.css'
import Leaderboard from '../LeaderBoard/LeaderBoard';
import Badge from '../Badge/Badge'


export default class MemberDashboard extends Component {
  static contextType = HouseholdContext;

  componentDidMount() {
    ApiService.getMemberTasks()
      .then(res => {
        this.context.setMemberTasks(res);
      })
      .catch(error => this.context.setError(error));
  }

  //Updated to handle marking completed. May want to update so that task remains but is marked 'completed' and button is deactivated?
  handleCompleted(id) {
    ApiService.completeTask(id)
      .then(this.context.completeTask(id))
      .catch(error => this.context.setError(error));
  }

  renderTasks() {
    const tasks = this.context.memberTasks;
    return tasks.map(task => {
      return (
        <li key={task.id}>
          <div className="taskName">
            <p>{task.title}</p>
          </div>
          <div className="points">
            <span>{task.points} EXP</span>
          </div>
          <div className="task-control">
          <button
            onClick={() => {
              this.handleCompleted(task.id);
            }}
          >
            Finished!
          </button>
          </div>
        </li>
      );
    });
  }

  render() {
    const {memberTasks} = this.context;
    console.log(memberTasks)
    return (
      <section className="memberDashboard">
        <div className='member-container'>
          <div className="leaderboard_container">
            <Leaderboard />
          </div>
          {/* <div className="badge-task-container"> */}
          <Badge />
          <div className='chores-container'>
            <h2>Chore-llenges</h2>

            <div className="task_list">
              <ul>{this.renderTasks()}</ul>
            </div>
          </div>
          </div>
        {/* </div> */}
      </section>
    );
  }
}
