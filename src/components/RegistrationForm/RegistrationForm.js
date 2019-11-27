import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Input, Required, Label } from '../Form/Form'
import AuthApiService from '../../services/auth-api-service'
import Button from '../Button/Button'
import './RegistrationForm.css'

class RegistrationForm extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => { }
  }

  state = { error: null }

  firstInput = React.createRef()

  handleSubmit = ev => {
    ev.preventDefault()
    const { name, username, password } = ev.target
    AuthApiService.postUser({
      name: name.value,
      username: username.value,
      password: password.value,
    })
      .then(user => {
        name.value = ''
        username.value = ''
        password.value = ''
        this.props.onRegistrationSuccess()
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  componentDidMount() {
    this.firstInput.current.focus()
  }

  render() {
    const { error } = this.state;

    return (
      <div className='box'>
        <form className='registration'
          onSubmit={this.handleSubmit}
        >
          <div role='alert'>
            {error && <p className='alertMsg' >{error}</p>}
          </div>
          <div className='formItem'>
            <Label htmlFor='registration-name-input'>
              Enter your name<Required />
            </Label>
            <Input className='formBox'
              ref={this.firstInput}
              id='registration-name-input'
              name='name'
              required
            />
          </div>
          <div className='formItem'>
            <Label htmlFor='registration-username-input'>
              Choose a username<Required />
            </Label>
            <Input className='formBox'
              id='registration-username-input'
              name='username'
              required
            />
          </div>
          <div className='formItem'>
            <Label htmlFor='registration-password-input'>
              Choose a password<Required />
            </Label>
            <Input className='formBox'
              id='registration-password-input'
              name='password'
              type='password'
              required
            />
          </div>
          <footer className='formFooter'>
            <Button type='submit' className='basicBtn'>
              Sign up
          </Button>
            {' '}
            <br />
            {/* <Link to='/login' className='already'>Already have an account?</Link> */}
          </footer>
        </form>
      </div>
    )
  }
}

export default RegistrationForm
