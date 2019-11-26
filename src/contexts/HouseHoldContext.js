import React, { Component } from 'react'
import ApiService from '../services/api-service'

export const household = {
    household: '',

}

const HouseholdContext = React.createContext({
    household: '',
    setHousehold: () => {}
})
export default HouseholdContext

export class HouseholdProvider extends Component{
    state = {
        household: '',
        householdField: [{ name: "" }] 
    }

    setHousehold = (household) => {
        this.setState({
            household
        })
        console.log('(in household context) household updated, heres proof ->', this.state.household)
    }

    

    render() {
        const value = {
            household:this.state.household,
            setHousehold: this.setHousehold

        }
        return (
            <HouseholdContext.Provider value ={value}>
                {this.props.children}
            </HouseholdContext.Provider>
        )
    }
}

