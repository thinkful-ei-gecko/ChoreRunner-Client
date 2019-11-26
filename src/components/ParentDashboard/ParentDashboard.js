import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import HouseholdContext from '../../contexts/HouseHoldContext'
import config from '../../config'
import TokenService from '../../services/token-service'

export default class ParentDashboard extends Component {
    state = { error: null }

    static contextType = HouseholdContext

    handleHouseholdSubmit = e => {
        e.preventDefault();
        let name = this.context.householdField.map(data => data.name)

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
    }

    render() {
        const { householdField } = this.context
        const { error } = this.state
        return (
            <div>
                <h2>PARENT DASHBOARD</h2>
                <div className='add-household container'>
                    <p>add household</p>
                    <form className='add-household-form'>
                        {
                            householdField.map((val, idx) => {
                                let hhId = `i-${idx}`
                                return (
                                    <div key={idx}>
                                        <input
                                            type="text"
                                            name={hhId}
                                            data-id={idx}
                                            id={hhId}
                                            className="name"
                                            value={householdField[idx].name}
                                            onChange={this.context.handleHouseHoldFieldChange}
                                            required
                                        />
                                    </div>
                                )
                            })
                        }
                        <button className='addHH' type='button' onClick={this.context.addHouseholdField}>+ add household</button>
                        <button className='submitHH' onClick={(e) => this.handleHouseholdSubmit(e)}>submit</button>
                    </form>
                </div>
                    <p> example: add household members</p>
                <div className='household-details container'>
                    ----------------------- HOUSEHOLD DETAILS ----------------------
                    <p>Household for household1: SHY-MONKEY</p>
                    <Link to='/task' style={{ textDecoration: 'none' }}>SEE (HOUSEHOLDS NAME) TASKS</Link>
                </div>
            </div>
        )
    }
}
