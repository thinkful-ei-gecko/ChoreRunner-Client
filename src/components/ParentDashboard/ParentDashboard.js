import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ApiService from '../../services/api-service'

export default class ParentDashboard extends Component {
    state = {
      household:'',
    }

    handleHouseholdSubmit = e => {
        e.preventDefault();
        let name=e.target.householdName.value
        ApiService.postHousehold(name)
          .then(result => {
              console.log('handle submit res', result)
              this.setState({
                  household: result
              })
          })
    }

    render() {
        console.log(this.state.household)
        return (
            <div>
                <h2>PARENT DASHBOARD</h2>
                <div>
                 <form onSubmit={this.handleHouseholdSubmit}>
                     <label htmlFor="household-name"></label>
                     <input type="text" id="household-name" name="householdName"></input>
                     <button type="submit">Sumbit</button>
                 </form>
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
