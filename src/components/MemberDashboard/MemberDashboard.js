import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import HouseholdContext from '../../contexts/HouseHoldContext';
import ApiService from '../../services/api-service.js';


export default class MemberDashboard extends Component  {
  static contextType = HouseholdContext;

  componentDidMount() {
    ApiService.getMemberTasks()
      .then(res => {
        this.context.setMemberTasks(res)
      })
      .catch(error => this.context.setError(error))
    //Get the tasks and information about this member
    //set context
    //catch error
  }


  //This will delete the task. Works for MVP, but we probably want to set up something
  //in a button component that will show "awaiting approval..etc."
  handleCompleted(id) {
    ApiService.completeTask(id)
      .then(() => {
        this.context.completeTask(id)
      })
      .catch(error => this.context.setError(error))
    //call the api service to complete the task
    //update the tasks context to show completed.
  }


  renderTasks() {
    const tasks = this.context.memberTasks;
    return(
      tasks.map(task => {
        return(
          <li key={task.id}>
            <div className="taskName">  
            <p>{task.title}</p>
            </div>
            <div className="points">
              <span>{task.points}</span>
            </div>
            <button onClick={this.handleCompleted(task.id)}>Finished!</button>
          </li>
        )
      })
    )
  }

  render() {
    return (
      <section className="memberDashboard">
        <div className="leader_board">THE LEADERBOARD WILL DISPLAY HERE</div>

        <header className="_header">
          <h2>MEMBERNAME HERE</h2>
        </header>
        <div className="task_list">
          <ul>
            {this.renderTasks()}
          </ul>
        </div>
      </section>
    );
  }
}
