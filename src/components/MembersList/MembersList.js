import React, { Component } from 'react';
import EditMember from '../EditMember/EditMember';
import TasksList from '../TasksList/TasksList';

export default class MembersList extends Component {

  render() {
    const {
      tasks,
      data,
      editing,
      household_id,
      editTitle,
      editPoints,
      updateMembersList,
      handleDeleteMember,
      handleEditTitleClick,
      handleTitleChange,
      handleEditPointsClick } = this.props;

    return (
      <ul>
        {
          data.map((member, index) => {
            return (
              <li key={index}>
                <p>{member.name}</p>
                <EditMember
                  editing={editing}
                  updateMembersList={updateMembersList}
                  member={member}
                  household_id={household_id}
                />
                <button onClick={() => handleDeleteMember(member.member_id)}>
                  Delete
                </button>

                {!member.tasks === {}
                  ? <p>No tasks</p>
                  : <TasksList
                    member={member}
                    editTitle={editTitle}
                    editPoints={editPoints}
                    handleEditTitleClick={this.handleEditTitleClick}
                    handleTitleChange={this.handleTitleChange}
                    handleEditPointsClick={this.handleEditPointsClick}
                  />
                }
              </li>
            );
          })
        }
      </ul>
    )
  };
}