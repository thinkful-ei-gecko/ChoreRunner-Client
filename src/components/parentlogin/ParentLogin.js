import React, { Component } from 'react'
import AuthApiService from '../../services/auth-api-service'
import UserContext from '../../contexts/UserContext'
import './ParentLogin.css'

export default class ParentLogin extends Component {
    static contextType = UserContext
    state = { error: null }

    onLoginSuccess = () => {
        const { location, history } = this.props
        const destination = (location.state || {}).from || '/parent-dashboard'
        history.push(destination)
      }
    

    handleSubmit = (e) => {
        e.preventDefault()
        const { username, password } = e.target

        this.setState({ error: null })

        AuthApiService.postLogin({
            username: username.value,
            password: password.value,
        })
            .then(res => {
                username.value = ''
                password.value = ''
                this.context.processLogin(res.authToken)
                this.onLoginSuccess()
            })
            .catch(res => {
                this.setState({ error: res.error })
            })

    }
    render() {
        const { error } = this.state
        return (
            <div className='parent-login container'>
                <h2> Parent Login</h2>
                <form className='parent-form-container' onSubmit={this.handleSubmit}>
                    <div role='alert'>
                        {error && <p>{error}</p>}
                    </div>
                    <div>
                        <label htmlFor='username'> Username</label>
                        <input name='username' type='text' required ></input>
                    </div>
                    <div>
                        <label htmlFor='password'> Password</label>
                        <input name='password' type='password' required ></input>
                    </div>
                    <button type='submit'>login</button>
                </form>
            </div>
        )
    }
}

