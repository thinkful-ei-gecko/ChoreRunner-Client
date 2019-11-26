import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import HouseholdContext from '../../contexts/HouseHoldContext'

export default class ParentDashboard extends Component {
    state = { error: null,
        household:'' }

    static contextType = HouseholdContext
//moved to context
    // handleHouseholdSubmit = e => {
    //     e.preventDefault();
    //     let name=e.target.householdName.value
    //     ApiService.postHousehold(name)
    //       .then(result => {
    //           console.log('handle submit res', result)
    //           this.setState({
    //               household: result
    //           })
    //       })
    // }

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
                        <button className='submitHH' onClick={(e) => this.context.submitHousehold(e)}>submit</button>
                    </form>
                </div>
                    <p> example: add household members</p>
                {/* <div className='addmembers-container'>
                    <form className='add-members-form'>
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
                                        <input
                                            type="text"
                                            name={hhId}
                                            data-id={idx}
                                            id={hhId}
                                            className="household"
                                            value={householdField[idx].name}
                                            onChange={this.context.handleHouseHoldFieldChange}
                                            required
                                        />
                                         <input
                                            type="text"
                                            name={hhId}
                                            data-id={idx}
                                            id={hhId}
                                            className="code"
                                            value={householdField[idx].name}
                                            onChange={this.context.handleHouseHoldFieldChange}
                                            required
                                        />
                                    </div>
                                )
                            })
                        }
                        <button className='addHH' type='button' onClick={this.context.addHouseholdField}>+ add household</button>
                        <button className='submitHH' onClick={(e) => this.context.submitHousehold(e)}>submit</button>
                    </form>
                </div> */}
                <div className='household-details container'>
                    ----------------------- HOUSEHOLD DETAILS ----------------------
                    <p>Household for household1: SHY-MONKEY</p>
                    <Link to='/task' style={{ textDecoration: 'none' }}>SEE (HOUSEHOLDS NAME) TASKS</Link>
                </div>
            </div>
        )
    }
}
