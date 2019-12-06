import React, { Component } from 'react';

export default class TasksList extends Component {

  render() {
    const {
      member,
      editTitle,
      editPts,
      handleEditTitleClick,
      handleTitleChange,
      handleEditPointsClick,} = this.props;

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
              handleEditPointsClick={handleEditPointsClick}
            />
          )
        })
        }
      </ul>
    )
  }
};

function Task(props) {
  const {
    task,
    member,
    editTitle,
    editPts,
    handleEditTitleClick,
    handleTitleChange,
    handleEditPointsClick } = props;

  return (
    <li key={task.id}>
      <button onClick={() => handleEditTitleClick()}>
        edit name
      </button>
      {editTitle ? (
        <div className='title'>
          <button onClick={() => handleEditPointsClick()}>
            save
      </button>
          <input
            className="update-title"
            placeholder={task.title}
            onChange={e => {
              handleTitleChange(e);
            }}
          />
        </div>
      ) : (
          <div className='title'>{task.title}&nbsp;</div>
        )}

      {editPts ? (
        <div className='points'>
          points:{' '}
          <input
            className="update-points"
            placeholder={task.points}
            onChange={e => {
              this.handlePoints(e);
            }}
          />
          <button onClick={() => this.handlePointsUpdate(task.id)}>
            save
      </button>
        </div>
      ) : (
          <div className='points'>points: {task.points}</div>
        )}
      <button onClick={(e) => this.setState({ editPts: true })}>
        edit points
  </button>
      <button
        onClick={() =>
          this.handleTaskDelete(task.id, member.member_id)
        }
      >
        Delete
  </button>
    </li>
  );
}