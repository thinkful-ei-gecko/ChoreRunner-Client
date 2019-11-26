import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class ParentDashboard extends Component {
    render() {
        return (
            <div>
                <h2>PARENT DASHBOARD</h2>
                <div>
                    ADD HOUSEHOLD FORMS HERE
                    <p> example: add household</p>
                    <p> example: add household members</p>
                </div>
                <div className='household-details container'>
                    ----------------------- HOUSEHOLD DETAILS ----------------------
                    <p>Household for household1: SHY-MONKEY</p>
                    <Link to='/task' style={{ textDecoration: 'none'}}>SEE (HOUSEHOLDS NAME) TASKS</Link>
                </div>
            </div>
        )
    }
}
