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
    titleError: '',
  }
  static contextType = HouseholdContext;

  onChangeHandle = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  validate = () => {
    let titleError = ''
    
    if(this.state.title.length <= 3) {
      titleError = 'Please enter more characters'
    }

    if(titleError) {
      this.setState({ titleError })
      return false;
    }

    return true;
  }


  toggleForm = () => {
    const formToggle = !this.state.showForm
    this.setState({ showForm: formToggle })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let isValid = this.validate();
    const household_id = this.props.household_id;
    let task = {
      'title': this.state.title,
      'points': this.state.points,
      'household_id': household_id,
      'member_id': this.state.member_id
    }

    
    if(isValid) {
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
        if(allTasks[this.state.member_id]) {
          allTasks[this.state.member_id].tasks.push({'id' : task.id, 'title' : task.title, 'points': task.points})
        } else {
          allTasks[this.state.member_id] = {
            'member_id': this.state.member_id,
            'name' : memberName,
            'username': userName,
            'tasks' : [{'id' : task.id, 'title' : task.title, 'points': task.points}],
          }
        }
        this.context.setTasks(allTasks);
        this.setState({
          showForm: false,
          title: '',
          points: '',
          member_id: '',
        })
        }
      )
      .catch(e => {
        console.error({e})
      })
      document.getElementById("add-task-form").reset();
    }
  }

  render() {
    let titleValidate = this.state.titleError
    let display; 
    if(this.state.showForm) {
      display = <form onSubmit={this.handleSubmit} id="add-task-form" className='add-task-form'>
      <label htmlFor="task-name">Task name</label>
      <input type="text" id="task-name" name="title" required onChange={this.onChangeHandle} value={this.state.title}></input>
      <div className="valid-error">{titleValidate}</div>
      <label htmlFor="assignee">Task assigned to</label>
      <select type="text" id="assignee" name="member_id" required onChange={this.onChangeHandle} defaultValue="Select household member">
        <option disabled>Select household member</option>
        {this.props.members.map((member, index) => <option key={index} value={member.id}>{member.name}</option>)}
      </select>
      <label htmlFor="points">Points</label>
      <input type="number" id="points" min="1" max="100" name="points" required onChange={this.onChangeHandle} value={this.state.points}></input>
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