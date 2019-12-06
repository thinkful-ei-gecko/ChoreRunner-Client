import React, { Component } from 'react';
import Task from '../Task/Task';

export default class TasksList extends Component {

  render() {
    const {
      member,
      editTitle,
      editPts,
      handleEditTitleClick,
      handleTitleChange,
      handleTitleUpdate,
      handleEditPointsClick,
      handlePointsChange,
      handlePointsUpdate,
      handleTaskDelete } = this.props;

    if (!member.tasks.length || member.tasks[0].title == null) {
      return <p>There are no tasks</p>
    } else {
      return (

        <ul className="householdpage-member-task-list">
          {member.tasks.map(task => {
            return (
              <Task
                member={member}
                task={task}
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
            )
          })
          }
        </ul>
      )
    };
  }
};