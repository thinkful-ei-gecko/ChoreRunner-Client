import React, { Component } from 'react';

export default class Task extends Component {
  render() {
    const {
      task,
      member,
      editTitle,
      editPts,
      handleEditTitleClick,
      handleTitleChange,
      handleTitleUpdate,
      handleEditPointsClick,
      handlePointsChange,
      handlePointsUpdate,
      handleTaskDelete} = this.props;

      console.log(task.id);


    return (
      <li key={task.id}>
        <button onClick={() => handleEditTitleClick()}>
          edit name
      </button>
        {editTitle ? (
          <div className='title'>
            <button onClick={() => handleTitleUpdate(task.id)}>
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
                handlePointsChange(e);
              }}
            />
            <button onClick={() => handlePointsUpdate(task.id)}>
              save
      </button>
          </div>
        ) : (
            <div className='points'>points: {task.points}</div>
          )}
        <button onClick={() => handleEditPointsClick()}>
          edit points
  </button>
        <button
          onClick={() =>
            handleTaskDelete(task.id, member.member_id)
          }
        >
          Delete
  </button>
      </li>
    );
  }
}