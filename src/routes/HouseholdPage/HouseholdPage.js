import React, { Component } from 'react'
import AddTask from '../../components/AddTask/AddTask'
import ApiService from '../../services/api-service'
import HouseholdContext from '../../contexts/HouseHoldContext';
import EditMember from '../../components/EditMember/EditMember'

export default class HouseholdPage extends Component {
  state = {
    membersList: [],
    tasks: {},
    task: ''
  }
  static contextType = HouseholdContext;

  updateMembersList = (updatedMember) => {
    this.setState({
      membersList: this.state.membersList.map(member =>
        member.id !== updatedMember.id ? member : updatedMember
      )
    });
  };

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
        console.log(this.context.tasks)
      })
  }

  renderTasks = () => {
    let tasks = this.context.tasks;

      let data = Object.values(tasks);
      
     
      return data.map((member, index) => {
        console.log(this.state.membersList)
        return (
          <div key={index}>
            <p>{member.name}</p>
            {/* try to put the button next to the member name? */}
            {/* Added form here becasuse we do not have/maybe need a get single user service.
            Can change if needed.*/} 

            {/* If we can get a member ID down to the edit component, the edit form will work. Currently, member_id: 1 is hard-coded. */}
            {/* <button onClick={() => {this.setState({editing: true})}}>Edit Member</button>  */}
           <EditMember editing = {this.state.editing} updateMember={this.updateMembersList} household_id={this.props.match.params.id}/>
            <ul>
            {member.tasks.map(task => {
              return (
                <li key={task.id}>{task.title}&nbsp;<span>points: {task.points}</span></li>
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
