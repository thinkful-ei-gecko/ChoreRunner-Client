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
      editPts,
      updateMembersList,
      handleDeleteMember,
      handleEditTitleClick,
      handleTitleChange,
      handleTitleUpdate,
      handleEditPointsClick,
      handlePointsChange,
      handlePointsUpdate,
      handleTaskDelete } = this.props;

    return (
      <div>
        {data.map((member, index) => {
          return (
            <div key={index}>
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
                  editPts={editPts}
                  handleEditTitleClick={handleEditTitleClick}
                  handleTitleChange={handleTitleChange}
                  handleTitleUpdate={handleTitleUpdate}
                  handleEditPointsClick={handleEditPointsClick}
                  handlePointsChange={handlePointsChange}
                  handlePointsUpdate={handlePointsUpdate}
                  handleTaskDelete={handleTaskDelete}
                />
              }
            </div>
          );
        })
        }
      </div>
    )
  };
}