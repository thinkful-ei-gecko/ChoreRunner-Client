import React from 'react';
import ApiService from '../../services/api-service';

export default class TasksToApprove extends React.Component {

  state = {
    tasks: []
  }

  componentDidMount() {
    ApiService.getTasksToApprove(this.props.household_id)
      .then(result => {
        this.setState({
          tasks: result
        })
      })
  }

  handleUpdateTaskStatus = (taskId, householdId, status) => {
    ApiService.parentUpdateTaskStatus(taskId, householdId, status)
      .then(result => {
        let updatedTasksToApprove = this.state.tasks.filter(task => task.id !== result[0].id)
        this.setState({
          tasks: updatedTasksToApprove
        })
      }
        )
  }

  render() {
    console.log(this.state.tasks);
    const householdId = this.props.household_id;
    return (
      <section>
        {this.state.tasks.map(task => 
          <li key={task.id}>{task.title}
            <button onClick={() => this.handleUpdateTaskStatus(task.id, householdId, 'approved')}>Approve</button>
            <button onClick={() => this.handleUpdateTaskStatus(task.id, householdId, 'assigned')}>Return</button></li>)}
      </section>
    )
  }
}