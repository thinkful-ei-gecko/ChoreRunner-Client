import React, { Component } from 'react'
import AddTask from '../../components/AddTask/AddTask'
import ApiService from '../../services/api-service'
import HouseholdContext from '../../contexts/HouseHoldContext';

export default class HouseholdPage extends Component {
  state = {
    membersList: [],
    tasks: {},
    task: ''
  }
  static contextType = HouseholdContext;

  componentDidMount() {
    const household_id = this.props.match.params.id;
    ApiService.getMembers(household_id)
      .then(members => {
        this.setState({
          membersList: members
      })
    })
    ApiService.getTasksForAll(household_id)
      .then(tasks => {
        this.context.setTasks(tasks)
      })
  }

  handleTaskDelete = (task_id, member_id) => {
    const household_id = this.props.match.params.id;
    let tasks = this.context.tasks;
    let memberTaskList = tasks[member_id];
    let filteredTasks = memberTaskList.tasks.filter(task => {
      return task.id !== task_id;
    })
    tasks[member_id].tasks = filteredTasks;
    ApiService.deleteTask(household_id, task_id)
      .then(() => this.context.setTasks(tasks))
  }

  renderTasks = () => {
    let tasks = this.context.tasks;
      let data = Object.values(tasks);
      return data.map((member, index) => {
        return (
          <div key={index}>
            <p>{member.name}</p>
            <ul>
            {member.tasks.map(task => {
              return (
                <li key={task.id}>{task.title}&nbsp;<span>points: {task.points}</span>
                <button onClick={() => this.handleTaskDelete(task.id, member.member_id)}>Delete</button>
                </li>
              )
            })}
            </ul>
          </div>
        )  
      })   
   
  }

  render() {
    return (
      <div>
        <h2>Household page</h2>
        <AddTask members={this.state.membersList} household_id={this.props.match.params.id}/>
        <section>{this.renderTasks()}</section>
      </div>
    )
  }
}
