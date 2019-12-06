import React, { Component } from 'react';
import AddTask from '../../components/AddTask/AddTask';
import ApiService from '../../services/api-service';
import HouseholdContext from '../../contexts/HouseHoldContext';
import MembersList from '../../components/MembersList/MembersList';
import './HouseholdPage.css'
import TasksToApprove from '../../components/TasksToApprove/TasksToApprove';


export default class HouseholdPage extends Component {
  state = {
    membersList: [],
    tasks: {},
    task: '',
    newPoints: '',
    newTitle: '',
    editPts: false,
    editTitle: false,
  };
  static contextType = HouseholdContext;

  updateMembersList = (updatedMember) => {
    let newMembers = this.state.membersList.map(member =>
      member.id !== updatedMember.id ? member : updatedMember
    );
    this.setState({
      membersList: newMembers,
    });
    let tasks = this.context.tasks;
    tasks[updatedMember.id].name = updatedMember.name;
    tasks[updatedMember.id].username = updatedMember.username;
    this.context.setTasks(tasks);
  }

  componentDidMount() {
    const household_id = this.props.match.params.id;
    ApiService.getMembers(household_id).then(members => {
      this.setState({
        membersList: members,
      });
    });
    ApiService.getTasksForAll(household_id).then(tasks => {
      this.context.setTasks(tasks);
    });
  }

  handleTitleUpdate = id => {
    let reqBody = {
      method: 'title',
      id: id,
      title: this.state.newTitle,
    };

    ApiService.updateTask(this.props.match.params, reqBody)
      .then(after => this.setState({ editTitle: false }))
      .then(after => this.updateEverything());
  };
  handlePointsUpdate = id => {
    let reqBody = {
      method: 'points',
      id: id,
      points: this.state.newPoints,
    };

    ApiService.updateTask(this.props.match.params, reqBody)
      .then(after => this.setState({ editPts: false }))
      .then(after => this.updateEverything());
  };

  //----- Re-get the updated values so the page can be updated with the new values -----
  updateEverything = () => {
    const household_id = this.props.match.params.id;
    ApiService.getMembers(household_id).then(members => {
      this.setState({
        membersList: members,
      });
    });
    ApiService.getTasksForAll(household_id).then(tasks => {
      this.context.setTasks(tasks);
    });
  };

  handleDeleteMember(id) {
    console.log(this.state.membersList)
    console.log(this.context.tasks)
    const household_id = this.props.match.params.id;
    ApiService.deleteMember(id, household_id)
      .then(() => {
        let newMembers = this.state.membersList.filter(member => member.id !== id);
        this.setState({ membersList: newMembers });
        let tasks = this.context.tasks;
        delete tasks[id];
        this.context.setTasks(tasks);
      })
      .catch(error => this.context.setError(error));
  }

  handleTaskDelete = (task_id, member_id) => {
    const household_id = this.props.match.params.id;
    let tasks = this.context.tasks;
    let memberTaskList = tasks[member_id];
    let filteredTasks = memberTaskList.tasks.filter(task => {
      return task.id !== task_id;
    });
    tasks[member_id].tasks = filteredTasks;
    ApiService.deleteTask(household_id, task_id).then(() =>
      this.context.setTasks(tasks)
    );
  };

  handleEditTitleClick = () => {
    this.setState({ editTitle: true });
  }

  handleTitleChange = (event) => {
    this.setState({ newTitle: event.target.value })
  }

  handleEditPointsClick = () => {
    this.setState({ editPts: true });
  }

  handlePointsChange = (event) => {
    this.setState({ newPoints: event.target.value})
  }


  render() {
    const { tasks } = this.context;
    const data = Object.values(tasks);

    return (
      <div className='household-page-container'>
        <h2>Household page</h2>
        <TasksToApprove
          household_id={this.props.match.params.id}
        />
        <AddTask
          members={this.state.membersList}
          household_id={this.props.match.params.id}
        />
        <MembersList
          tasks={tasks}
          data={data}
          editing={this.state.editing}
          household_id={this.props.match.params.id}
          editTitle={this.state.editTitle}
          editPts={this.state.editPts}
          updateMembersList={this.updateMembersList}
          handleDeleteMember={this.handleDeleteMember}
          handleEditTitleClick={this.handleEditTitleClick}
          handleTitleChange={this.handleTitleChange}
          handleEditPointsClick={this.handleEditPointsClick}
          handlePointsChange={this.handlePointsChange}
        />
      </div>
    );
  }
}

