import React, { Component } from 'react';
import AddTask from '../../components/AddTask/AddTask';
import ApiService from '../../services/api-service';
import HouseholdContext from '../../contexts/HouseHoldContext';
import MembersList from '../../components/MembersList/MembersList';
import './HouseholdPage.css';
import TasksToApprove from '../../components/TasksToApprove/TasksToApprove';

/*
Alex Edits:
- I grouped some of the methods together for legibility.
- In state, I changed boolean 'editing' to 'editMember' for consistency and added a toggleEditMember callback.
*/

export default class HouseholdPage extends Component {
  state = {
    membersList: [],
    tasks: {},
    task: '',
    newPoints: '',
    newTitle: '',
    editMember: false,
    editPts: false,
    editTitle: false,
  };
  static contextType = HouseholdContext;

  componentDidMount() {
    this.updateEverything();
  }

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

  //Member callbacks
  updateMembersList = updatedMember => {
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
  };

  toggleEditMember = () => {
    console.log('toggle firing');
    this.setState({ editMember: !this.state.editMember });
    console.log(this.state.editMember);
  };

  handleDeleteMember = (id, household_id) => {
    // console.log(this.state.membersList)
    console.log(household_id);
    // const household_id = this.props.match.params.id;
    ApiService.deleteMember(id, household_id)
      .then(() => {
        let newMembers = this.state.membersList.filter(
          member => member.id !== id
        );
        this.setState({ membersList: newMembers });
        let tasks = this.context.tasks;
        delete tasks[id];
        this.context.setTasks(tasks);
      })
      .catch(error => this.context.setError(error));
  };

  handleTaskDelete = (task_id, member_id) => {
    const household_id = this.props.match.params.id;
    let tasks = this.context.tasks;
    let memberTaskList = tasks[member_id];
    let filteredTasks = memberTaskList.tasks.filter(task => {
      return task.id !== task_id;
    });
    tasks[member_id].tasks = filteredTasks;
    ApiService.deleteTask(household_id, task_id)
      .then(() => this.context.setTasks(tasks))
      .then(() => {
        this.updateMembersList();
      })
      .catch(error => this.context.setError(error));
  };

  //Task Title input callbacks
  handleEditTitleClick = () => {
    this.setState({ editTitle: true });
  };

  handleTitleChange = event => {
    this.setState({ newTitle: event.target.value });
  };

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

  //Task Points input callbacks
  handleEditPointsClick = () => {
    this.setState({ editPts: true });
  };

  handlePointsChange = event => {
    this.setState({ newPoints: event.target.value });
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

  handleResetScores = () => {
    let household_id = this.props.match.params.id;
    ApiService.resetScores(household_id)
      .then(res => console.log(res))
      .catch(error => this.context.setError(error));
  };

  render() {
    const { tasks } = this.context;
    const data = Object.values(tasks);

    return (
      <div className="household-page-container">
        <h2>Household page</h2>
        <TasksToApprove household_id={this.props.match.params.id} />
        <AddTask
          members={this.state.membersList}
          household_id={this.props.match.params.id}
          updateEverything={this.updateEverything}
        />
        <button onClick={this.handleResetScores}>Reset All Scores</button>
        <MembersList
          tasks={tasks}
          data={data}
          household_id={this.props.match.params.id}
          editMember={this.state.editMember}
          editTitle={this.state.editTitle}
          editPts={this.state.editPts}
          updateMembersList={this.updateMembersList}
          toggleEditMember={this.toggleEditMember}
          handleDeleteMember={this.handleDeleteMember}
          handleEditTitleClick={this.handleEditTitleClick}
          handleTitleChange={this.handleTitleChange}
          handleTitleUpdate={this.handleTitleUpdate}
          handleEditPointsClick={this.handleEditPointsClick}
          handlePointsChange={this.handlePointsChange}
          handlePointsUpdate={this.handlePointsUpdate}
          handleTaskDelete={this.handleTaskDelete}
        />
      </div>
    );
  }
}
