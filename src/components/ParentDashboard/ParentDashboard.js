import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import HouseholdContext from '../../contexts/HouseHoldContext'
import config from '../../config'
import TokenService from '../../services/token-service'

export default class ParentDashboard extends Component {
    state = { 
        error: null,
        householdName: ''
    }

    static contextType = HouseholdContext

    updateHHname = (e) => {
        this.setState({
            householdName: e.target.value
        })
    }

    handleHouseholdSubmit = (e) => {
        e.preventDefault();

        let name = this.state.householdName

        fetch(`${config.API_ENDPOINT}/households`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify({ name }) // req.body = {name: ["dunders"]}
        })
            .then(res =>
                // console.log(res)
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
            .then(result => this.context.setHousehold(result))
            .then(after => this.setState({householdName: ''}))
    }

    render() {
 
        const { error } = this.state
        console.log(this.context)
        console.log(this.state.householdName)
        return (
            <div>
                <h2>PARENT DASHBOARD</h2>
                <div className='add-household container'>
                    <p>add household</p>
                    <form className='add-household-form' onSubmit={this.handleHouseholdSubmit}>
                        
                        <label htmlFor='householdName'> ADD HOUSEHOLD</label>
                        <input name='householdName' type='text' value={this.state.householdName} onChange={this.updateHHname} required ></input>
                        <button className='submitHH' type='submit'>add</button>
                    </form>
                </div>
                <p> example: add household members</p>
                <div className='household-details container'>
                    ----------------------- HOUSEHOLD DETAILS ----------------------
                    <p>Household for household1: SHY-MONKEY</p>
                    <Link to='/task' style={{ textDecoration: 'none' }}>SEE {this.context.household.name} TASKS</Link>
                </div>
            </div>
        )
    }
}
