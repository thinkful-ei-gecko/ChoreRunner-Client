import React, { Component } from 'react'


export const household = {
    householdField: [{ name: "" }],
    membersField: [{ name: "", household: "", code: "" }]
}

const HouseholdContext = React.createContext({
    householdField: [{ name: "" }],
    addIngredField:() => {},
    handleHouseHoldFieldChange: () => {},
    submitHousehold: () => {}
})
export default HouseholdContext

export class HouseholdProvider extends Component{
    state = {
        householdField: [{ name: "" }] 
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

    submitHousehold = (e) => {
        e.preventDefault()
        let dataArray = this.state.householdField.map(data => data.name)
        console.log(dataArray) // ["dunders", "mifflins"]
    }
    //----------------------------------------------------------------------------------------
    render() {
        const value = {
            householdField: this.state.householdField,
            addHouseholdField: this.addHouseholdField,
            handleHouseHoldFieldChange: this.handleHouseHoldFieldChange,
            submitHousehold: this.submitHousehold
        }
        return (
            <HouseholdContext.Provider value ={value}>
                {this.props.children}
            </HouseholdContext.Provider>
        )
    }
}

