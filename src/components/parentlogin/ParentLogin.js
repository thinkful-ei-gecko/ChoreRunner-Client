import React, { Component } from 'react'

export default class ParentLogin extends Component {
    render() {
        return (
            <div>
                <h2> parent login</h2>
                <form className='parent-form-container'>
                    <label htmlFor='parent username'> Username</label> 
                    <input name='parent username' type='text' required ></input>
                    <label htmlFor='parent password'> Password</label> 
                    <input name='parent password' type='text' required ></input>
                    <button type='submit'>login</button>
                </form>
            </div>
        )
    }
}

