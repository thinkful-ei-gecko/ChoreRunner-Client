import React, { Component } from 'react';
import EditMember from '../EditMember/EditMember';
import TasksList from '../TasksList/TasksList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import TasksToApprove from '../../components/TasksToApprove/TasksToApprove';

export default class MembersList extends Component {

  render() {
    const {
      tasks,
      data,
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
          let assigned = [];
          let completed = [];
          member.tasks.forEach(task => {
            if (task.status === 'assigned') {
              assigned.push(task)
            } 
            else if (task.status === 'completed') {
              completed.push(task)
            }
          })
          console.log(completed, assigned)
          return (
            <section key={index} className="member-card">
              <div className="delete-edit-name">
                <h3 className="member-name">{member.name}</h3>
                <EditMember
                  updateMembersList={updateMembersList}
                  member={member}
                  household_id={household_id}
                />
                <button onClick={() => handleDeleteMember(member.member_id, household_id)}>
                <FontAwesomeIcon icon={faTrashAlt} size="2x" color="red"/>
                </button>
              </div>
            <p>Total score: {member.total_score}</p>
            {!completed.length ?
            <section className="tasks-to-approve">
            <h3>Tasks to approve</h3>
            <p>There are no tasks</p>
            </section>
            :
            <TasksToApprove householdId={household_id} memberId={member.member_id}/>}
            {!assigned.length
              ? <section className="assigned-tasks">
                <h3>Assigned tasks</h3>
                <p>There are no tasks</p>
                </section>
              : <TasksList
                tasks={tasks}
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
            </section>
          );
        })
        }
      </div>
    )
  };
}