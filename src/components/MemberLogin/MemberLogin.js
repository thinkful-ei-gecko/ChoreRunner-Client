import React, { Component } from 'react'
import AuthApiService from '../../services/auth-api-service'
import UserContext from '../../contexts/UserContext'
import './MemberLogin.css'

export default class MemberLogin extends Component {

  static contextType = UserContext

  state = {
    username: '',
    password: '',
    error: null,
    validateError: {
      usernameError: '',
      passwordError:'',
    }
  }

  onChangeHandle = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  validate = () => {
    const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/;
    const { username, password } = this.state;
    let usernameError = '';
    let passwordError = '';
  
    if(username.trim().length <= 5) {
      usernameError = 'Please enter more characters'
    }
    
    if (password.length < 5) {
      passwordError = 'Password be longer than 8 characters';
    }
    if (password.length > 20) {
      passwordError = 'Password be less than 72 characters';
    }
    if (password.startsWith(' ') || password.endsWith(' ')) {
      passwordError = 'Password must not start or end with empty spaces';
    }
    if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)) {
      passwordError = 'Password must contain one upper case, lower case, number and special character';
    }


    if(passwordError || usernameError) {
      this.setState({ validateError: { passwordError, usernameError } })
      return false;
    }
    return true;
  }

  onLoginSuccess = () => {
    const { location, history } = this.props
    const destination = (location.state || {}).from || '/member-dashboard'
    history.push(destination)
  }
  

  handleSubmit = (e) => {
    e.preventDefault()
    const { username, password } = e.target
    const isValid = this.validate();

    this.setState({ error: null })

   // if(isValid) {
      AuthApiService.postMemberLogin({
        username: username.value,
        password: password.value,
      })
      .then(res => {
        username.value = ''
        password.value = ''
        this.context.processLogin(res.authToken, res.type)
        this.onLoginSuccess()
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
      document.getElementById("member-login").reset();
   // }

  }
  render() {
    const { error, username, password } = this.state
    const { usernameError, passwordError } = this.state.validateError

    return (
      <div className='parent-login'>
        <h2> Member login</h2>
        <form className='parent-form-container' id="member-login" onSubmit={this.handleSubmit}>
          {/* <div role='alert'>
            {error && <p>{error}</p>}
          </div> */}
          <div>
            <label htmlFor='username'> Username</label>
            <input name='username' type='text' onChange={this.onChangeHandle} value={username} required ></input>
            <div className="valid-error">{usernameError}</div>
          </div>
          <div>
            <label htmlFor='password'> Password</label>
            <input name='password' type='password' onChange={this.onChangeHandle} value={password} required ></input>
            <div role='alert'>
              {error && <p>{error}</p>}
            </div>
          </div>
          <button type='submit'>login</button>
        </form>
      </div>
    )
  }
}

