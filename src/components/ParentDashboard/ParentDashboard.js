import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import HouseholdContext from '../../contexts/HouseHoldContext'
import ApiService from '../../services/api-service.js'

export default class ParentDashboard extends Component {
    state = { 
        error: null,
        householdName: ''
    }
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
        //PUT LOGIC AND API FETCH FOR THIS ENDPOINT.
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
        const { error } = this.state
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
                <p> example: add household members</p>
                    {/* this is an example, but we really might want to move this
                     into another component so that this page is clean
                     
                     Example add a family member...*/}
                     <form className="add-household-form" onSubmit={this.handleAddMember}>
                         <label>Member Name
                            <input type="text" name="memberName"/>
                         </label>
                         <label>Select household
                            <select name="househole">
                                {this.renderOptions()}
                            </select>
                         </label>
                         <button type="submit">Add Member</button>
                     </form>

                <div className='household-details container'>
                    ----------------------- HOUSEHOLD DETAILS ----------------------
                    <p>Household for household1: SHY-MONKEY</p>
                    <Link to='/task' style={{ textDecoration: 'none' }}>SEE TASKS</Link>
                </div>
            </div>
        )
    }
}
