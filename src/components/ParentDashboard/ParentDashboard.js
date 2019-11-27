import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import HouseholdContext from '../../contexts/HouseHoldContext'
import config from '../../config'
import TokenService from '../../services/token-service'
import AddMembers from '../AddMembers/AddMembers'

export default class ParentDashboard extends Component {
    state = { 
        error: null,
        householdName: '',
        householdsList: []
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
            // .then(result => this.context.setHousehold(result))
            .then(household => this.setState({householdsList: [...this.state.householdsList, household]}))
    }
    componentDidMount() {
        fetch(`${config.API_ENDPOINT}/households`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
            .then(households => {
                console.log(households)
                this.setState({
                    householdsList: households
                })
            })
    }
    render() {
 
        const { error } = this.state
        console.log(this.state.householdsList)
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
                    <h2>Add household members</h2>
                    <AddMembers households={this.state.householdsList}/>
                <div className='household-details container'>
                    ----------------------- HOUSEHOLD DETAILS ----------------------
                    {this.state.householdsList.map((household, index) => {
                        return <Link to={`/household/${household.id}`} key={index}><p>{household.name}</p></Link>
                    })}
                </div>
            </div>
        )
    }
}
