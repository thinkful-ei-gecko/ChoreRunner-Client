import React, { Component } from 'react'
import ApiService from '../services/api-service'

export const household = {
    household: '',
    householdField: [{ name: "" }],
    membersField: [{ name: "", household: "", code: "" }]
}

const HouseholdContext = React.createContext({
    household: '',
    householdField: [{ name: "" }],
    addIngredField:() => {},
    handleHouseHoldFieldChange: () => {},
    submitHousehold: () => {},
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

    //--------------------- Parent Dashboard's add household handlers ------------------------ 
    addHouseholdField = (e) => {
        console.log('in add household')
        this.setState((prevState) => ({
            householdField: [...prevState.householdField, { name: "" }],
        }));
    }

    handleHouseHoldFieldChange = (e) => {
        console.log(e.target.value)
        if (["name"].includes(e.target.className)) {
            let householdField = [...this.state.householdField]

            householdField[e.target.dataset.id][e.target.className] = e.target.value
            this.setState({ householdField })
        } else {
            this.setState({ [e.target.name]: e.target.value })
        }

        // if (["household"].includes(e.target.className)) {
        //     let membersField = [...this.state.membersField]

        //     membersField[e.target.dataset.id][e.target.className] = e.target.value
        //     this.setState({ membersField })
        // }

    }

    //----------------------------------------------------------------------------------------


    render() {
        const value = {
            household:this.state.household,
            householdField: this.state.householdField,
            addHouseholdField: this.addHouseholdField,
            handleHouseHoldFieldChange: this.handleHouseHoldFieldChange,
            submitHousehold: this.submitHousehold,
            setHousehold: this.setHousehold

        }
        return (
            <HouseholdContext.Provider value ={value}>
                {this.props.children}
            </HouseholdContext.Provider>
        )
    }
}

