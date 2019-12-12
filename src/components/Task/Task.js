import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'

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
        {editTitle ? (
          <div className='title'>
            <input
              className="update-title"
              placeholder={task.title}
              onChange={e => {
                handleTitleChange(e);
              }}
          />
          <button 
            className="save-title-edit"
            onClick={() => handleTitleUpdate(task.id)}>
            Save
          </button>
          </div>
        ) : (
            <div className='title'>
              <div className='content'> 
                <span>{task.title}&nbsp;</span>
                <button onClick={() => handleEditTitleClick()}>
                  <FontAwesomeIcon icon={faPencilAlt} size="lg" color="green"/>
                </button>
              </div>
            </div>
          )}
      
        {editPts ? (
          <div className='points'>
            <input
              className="update-points"
              placeholder={task.points}
              onChange={e => {
                handlePointsChange(e);
              }}
            />
            <button 
              className="save-points-edit"
              onClick={() => handlePointsUpdate(task.id)}>
              Save
            </button>
          </div>
        ) : (
            <div className='points'>
              <span>points: {task.points}</span>
              <button onClick={() => handleEditPointsClick()}>
                <FontAwesomeIcon icon={faPencilAlt} size="lg" color="green"/>
              </button>
            </div>
          )}
        
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