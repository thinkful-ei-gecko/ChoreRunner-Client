import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import HouseholdContext from '../../contexts/HouseHoldContext'
import config from '../../config'
import TokenService from '../../services/token-service'
import AddMembers from '../AddMembers/AddMembers'

export default class ParentDashboard extends Component {
    state = { 
        error: null,
<<<<<<< HEAD
        household: ''
     }
=======
        householdName: ''
    }
>>>>>>> b7fa9182277daa8eacda3c46de1e14c7af168d62

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
<<<<<<< HEAD
            .then(result => {
                this.context.setHousehold(result)
                this.setState({
                  household: result
                })
            })
    }

    render() {
        console.log('state in dashboard', this.state.household)
        const { householdField } = this.context
        const { error } = this.state
=======
            .then(result => this.context.setHousehold(result))
            .then(after => this.setState({householdName: ''}))
    }

    render() {
 
        const { error } = this.state
        console.log(this.context)
        console.log(this.state.householdName)
>>>>>>> b7fa9182277daa8eacda3c46de1e14c7af168d62
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
<<<<<<< HEAD
                    <h2>Add household members</h2>
                    <AddMembers />
=======
                <p> example: add household members</p>
>>>>>>> b7fa9182277daa8eacda3c46de1e14c7af168d62
                <div className='household-details container'>
                    ----------------------- HOUSEHOLD DETAILS ----------------------
                    <p>Household for household1: SHY-MONKEY</p>
                    <Link to='/task' style={{ textDecoration: 'none' }}>SEE {this.context.household} TASKS</Link>
                </div>
            </div>
        )
    }
}
