import React, { Component } from 'react';
import Task from '../Task/Task';

export default class TasksList extends Component {

  render() {
    const {
      tasks,
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

    return (
      <section className="assigned-tasks">
        <h3>Assigned tasks</h3>
        <ul className="householdpage-member-task-list">
          {member.tasks.map(task => {
            if (task.status === 'assigned') {
            return (
              <Task
                tasks={tasks}
                member={member}
                task={task}
                key={task.id}
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
            }
          })
          }
        </ul>
      </section>
    )
  };
};