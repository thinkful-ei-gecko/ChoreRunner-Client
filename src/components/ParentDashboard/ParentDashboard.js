import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import HouseholdContext from '../../contexts/HouseHoldContext'
import ApiService from '../../services/api-service.js'
import AddMembers from '../AddMembers/AddMembers'

export default class ParentDashboard extends Component {
    // state = { 
    //     error: null,
    //     // householdName: '',
    //     householdsList: []
    // }
    static contextType = HouseholdContext

    componentDidMount() {
        ApiService.getHouseholds()
        .then(res => {
            this.context.setHouseholds(res)
        })
        .catch(error => this.setState({
            error:error
        }))
    }

    handleAddMember = e => {
        e.preventDefault();
        let name = e.target.memberName.value;
        let username = e.target.username.value;
        let password = e.target.memberPassword.value;
        let household_id = e.target.household.value;
        let newMember = {
            name, 
            username, 
            password,
            household_id,
        }
        ApiService.addMember(newMember, household_id)
            .then(res => {
          this.context.addMember(res)
                //want to push to the context array with the added member. 
                console.log(res)
            })
            .catch(error => console.log(error))
    }
    

    handleHouseholdSubmit = (e) => {
        e.preventDefault();
        let name = e.target.householdName.value
        ApiService.postHousehold(name) 
        .then(res => {//lets add it to the array in context so it will render. 
        })
        .catch(error => console.log(error))
    }

    renderOptions() {
        const {households} = this.context;
        return (
            households.map(house => {
                return (
                    <option key={house.householdId} value={house.householdId}>{house.housename}</option>
                )
            })
        )
    }

    render() {
        const {households} = this.context
        console.log(households)
        return (
            <div>
                <h2>PARENT DASHBOARD</h2>
                <div className='add-household container'>
                    <p>add household</p>
                    <form className='add-household-form' onSubmit={this.handleHouseholdSubmit}>
                        <label htmlFor='householdName'> ADD HOUSEHOLD</label>
                        <input name='householdName' type='text' required ></input>
                        <button className='submitHH' type='submit'>add</button>
                    </form>
                </div>
                <div className='household-details container'>
                    <h2>Add household members</h2>
                        <AddMembers />
                    {households.map((household, index) => {
                        return <Link to={`/household/${household.id}`} key={index}><p>{household.name}</p></Link>
                    })}
                </div>
            </div>
        )
    }
}
