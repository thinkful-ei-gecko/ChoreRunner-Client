import React from 'react';
import HouseholdContext from '../../contexts/HouseHoldContext';
import config from '../../config';
import TokenService from '../../services/token-service';
import './AddTask.css'

export default class AddTask extends React.Component {
  state = {
    showForm: false,
    title: '',
    points: '',
    member_id: '',
  }
  static contextType = HouseholdContext;

  handleTitleChange = e => {
    this.setState({
      title: e.target.value,
    })
  }

  handlePointsChange = e => {
    this.setState({
      points: e.target.value,
    })
  }

  handleAssigneeChange = e => {
    this.setState({
      member_id: e.target.value,
    })
  }

  toggleForm = () => {
    const formToggle = !this.state.showForm
    this.setState({ showForm: formToggle })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const household_id = this.props.household_id;
    let task = {
      'title': this.state.title,
      'points': this.state.points,
      'household_id': household_id,
      'member_id': this.state.member_id
    }


    fetch(`${config.API_ENDPOINT}/households/${household_id}/tasks`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(task)
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
      .then((task) => {
        let memberName = this.props.members.filter(member =>
          parseInt(member.id) === parseInt(this.state.member_id)).pop().name
        let userName = this.props.members.filter(member =>
          parseInt(member.id) === parseInt(this.state.member_id)).pop().username

        const allTasks = this.context.tasks;
        if (allTasks[this.state.member_id]) {
          allTasks[this.state.member_id].tasks.push({ 'id': task.id, 'title': task.title, 'points': task.points })
        } else {
          allTasks[this.state.member_id] = {
            'member_id': this.state.member_id,
            'name': memberName,
            'username': userName,
            'tasks': [{ 'id': task.id, 'title': task.title, 'points': task.points }],
          }
          return allTasks;
        }
      })
      .then(allTasks => {
        this.context.setTasks(allTasks);
        this.setState({
          showForm: false,
          title: '',
          points: '',
          member_id: '',
        })
        this.props.updateEverything();
      })
      .catch(e => {
        console.error({ e })
      })
  }

  render() {
    let display;
    if (this.state.showForm) {
      display = <form onSubmit={this.handleSubmit} className='add-task-form'>
        <label htmlFor="task-name">Task name</label>
        <input type="text" id="task-name" required onChange={this.handleTitleChange} value={this.state.title}></input>
        <label htmlFor="assignee">Task assigned to</label>
        <select type="text" id="assignee" required onChange={this.handleAssigneeChange} defaultValue="Select household member">
          <option disabled>Select household member</option>
          {this.props.members.map((member, index) => <option key={index} value={member.id}>{member.name}</option>)}
        </select>
        <label htmlFor="points">Points</label>
        <input type="number" id="points" min="1" max="100" required onChange={this.handlePointsChange} value={this.state.points}></input>
        <button type="submit">Add task</button>
      </form>
    }
    return (
      <div>
        <button onClick={this.toggleForm}>Add a new task</button>
        {display}
      </div>
    )
  }
}