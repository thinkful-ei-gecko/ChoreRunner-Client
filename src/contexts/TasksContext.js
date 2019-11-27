import React, { Component } from 'react';

const TasksContext = React.createContext({
  tasks: [],
  error: null,
  setTasks: () => {},
  setError: () => {},
})

export default TasksContext;

export class TasksProvider extends Component {
  state = {
    tasks: [],
    error: null,
  }

  setTasks = tasks => {
    this.setState({ tasks })
  }

  setError = error => {
    this.setState({ error })
  }

  render() {
    const value ={
      tasks: this.state.tasks,
      error: this.state.error,
    }
    return(
      <TasksContext.Provider value={value}>
        {this.props.children}
      </TasksContext.Provider>
    )
  }
}