import React from 'react';
import config from '../../config';
import TokenService from '../../services/token-service';
import TasksContext from '../../contexts/TasksContext'
import ChoreApiService from '../../services/chore-api-service'

export default class AddTask extends React.Component {
  state = {
    title: '',
    points: '',
    tasks: [],
    showForm: false,
  }

  static contextType = TasksContext

  handleSubmit = e => {
    e.preventDefault();

    let task = this.state;
    const household_id = this.props.match.params.id;
    task = {...task, household_id};

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
        // this.props.history.push('/home');
        this.setState({
          tasks: [...this.state.tasks, task]
        })
      }
    )
    .catch(e => {
      console.error({e})
    })
  }

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

  toggleForm = () => {
    const formToggle = !this.state.showForm
    this.setState({ showForm: formToggle })
  }

  renderTasks = () => {
    this.context.tasks.map((task, idx) => {
      let totalScore = task.points.reduce((a, b) => a + b)
      return <>
      <li>
        <p>{task.assigned}'s Tasks:</p>
        <label>{task.title}</label>
        <p>Points: {task.points}</p>
        <button>Done</button>
      </li>
      <p>Total Score: {totalScore}</p>
      </>
    })
  }

  componentDidMount() {
    // Fetch request to get tasks and members.
    // Delete request to remove completed task.
    // Post request to update points after task deletion

    // const { household_id } = this.props.match.params;
    // ChoreApiService.getTasks(household_id)
    //   .then(res => this.context.setTasks(res))
    //   .catch(this.context.setError)
    //   console.log(household_id)
  }

  render() {
    console.log(this.state)
    console.log(this.context.tasks = [])
    let display; 
    if(this.state.showForm) {
      display = <form onSubmit={this.handleSubmit}>
      <label htmlFor="task-name">Task name</label>
      <input type="text" id="task-name" required onChange={this.handleTitleChange}></input>
      <label htmlFor="assignee">Task assigned to</label>
      <select type="text" id="assignee" required onChange={this.handleAssigneeChange}>
        {/* {this.props.members.map((member, index) => <option key={index}>{member.name}</option>)} */}
      </select>
      <label htmlFor="points">Points</label>
      <input type="number" id="points" min="1" max="100" required onChange={this.handlePointsChange}></input>
      <button type="submit">Add task</button>
    </form>
    } 
    
    return(
      <>
        <div>
          <button onClick={this.toggleForm}>Toggle Form</button>
            {display}
        </div>
        <div htmlFor="task-table">
        </div>
      </>
    )
  }
}