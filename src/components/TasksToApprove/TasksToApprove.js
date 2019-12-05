import React from 'react';
import ApiService from '../../services/api-service';
import HouseholdContext from '../../contexts/HouseHoldContext';

export default class TasksToApprove extends React.Component {

  state = {
    tasks: []
  }
  static contextType = HouseholdContext;
  componentDidMount() {
    ApiService.getTasksToApprove(this.props.household_id)
      .then(result => {
        this.setState({
          tasks: result
        })
      })
  }

  handleUpdateTaskStatus = (taskId, householdId, status, points, memberId) => {
    ApiService.parentUpdateTaskStatus(taskId, householdId, status, points, memberId)
      .then(result => {
        let updatedTasksToApprove = this.state.tasks.filter(task => task.id !== result[0].id)
        this.setState({
          tasks: updatedTasksToApprove
        })
        let tasks = this.context.tasks;
        console.log(tasks)
        if (status === 'approved') {
          let memberTaskList = tasks[memberId];
          let filteredTasks = memberTaskList.tasks.filter(task => {
            return task.id !== taskId;
          });
          tasks[memberId].tasks = filteredTasks;
          this.context.setTasks(tasks)
        }
      })
  }

  render() {
    const householdId = this.props.household_id;
    return (
      <section>
        {this.state.tasks.map(task => 
          <li key={task.id}>{task.title}
            <button onClick={() => this.handleUpdateTaskStatus(task.id, householdId, 'approved', task.points, task.member_id)}>Approve</button>
            <button onClick={() => this.handleUpdateTaskStatus(task.id, householdId, 'assigned', task.points, task.member_id)}>Return</button></li>)}
      </section>
    )
  }
}