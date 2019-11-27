import React, { Component } from 'react'
import AddTask from '../../routes/AddTask/AddTask'

export default class Task extends Component {
    render() {
        return (
            <div>
                <h2>TASK PAGE</h2>
                <AddTask />
            </div>
        )
    }
}
