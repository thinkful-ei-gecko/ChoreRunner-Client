import React, { Component } from 'react';
import AddTask from '../../components/AddTask/AddTask';
import ApiService from '../../services/api-service';
import HouseholdContext from '../../contexts/HouseHoldContext';
import EditMember from '../../components/EditMember/EditMember';
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

  deleteMember(id) {
    let newMembers = this.state.membersList.filter(member => member.id !== id);
    this.setState({ membersList: newMembers });
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
      .then(() => this.deleteMember(id))
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

  renderTasks = () => {
    let tasks = this.context.tasks;
    let data = Object.values(tasks);

    return data.map((member, index) => {
      console.log(member.name)
      return (
        <div key={index}>
          <p>{member.name}</p>
          <EditMember
            editing={this.state.editing}
            updateMember={this.updateMembersList}
            member={member}
            household_id={this.props.match.params.id}
          />
          <button onClick={() => this.handleDeleteMember(member.member_id)}>
            Delete
          </button>
          <ul>
            {member.tasks.map(task => {
              return (
                <li key={task.id}>
                  <button onClick={() => this.setState({ editTitle: true })}>
                    edit
                  </button>
                  {this.state.editTitle ? (
                    <span>
                      <button onClick={() => this.handleTitleUpdate(task.id)}>
                        save
                      </button>
                      <input
                        className="update-title"
                        placeholder={task.title}
                        onChange={e => {
                          this.setState({ newTitle: e.target.value });
                        }}
                      />
                    </span>
                  ) : (
                    <span>{task.title}&nbsp;</span>
                  )}

                  {this.state.editPts ? (
                    <span>
                      points:{' '}
                      <input
                        className="update-points"
                        placeholder={task.points}
                        onChange={e => {
                          this.setState({ newPoints: e.target.value });
                        }}
                      />
                      <button onClick={() => this.handlePointsUpdate(task.id)}>
                        save
                      </button>
                    </span>
                  ) : (
                    <span>points: {task.points}</span>
                  )}
                  <button onClick={() => this.setState({ editPts: true })}>
                    edit
                  </button>
                  <button
                    onClick={() =>
                      this.handleTaskDelete(task.id, member.member_id)
                    }
                  >
                    Delete
                  </button>
                </li>
                // <li key={task.id}>{task.title}&nbsp;<span>points: {task.points}</span>

                // </li>
              );
            })}
          </ul>
        </div>
      );
    });
  };

  render() {
    return (
      <div>
        <h2>Household page</h2>

        <div>
          This are tasks to be approved
          <li>Task 1 <button>Approve</button></li>
        </div>
        <TasksToApprove 
          household_id={this.props.match.params.id}
        />
        <AddTask
          members={this.state.membersList}
          household_id={this.props.match.params.id}
        />
        <section>{this.renderTasks()}</section>
      </div>
    );
  }
}
