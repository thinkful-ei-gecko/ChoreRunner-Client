import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../../services/token-service'
import UserContext from '../../contexts/UserContext'
import './Header.css'

class Header extends Component {
  static contextType = UserContext

  handleLogoutClick = () => {
    this.context.processLogout()
  }

  renderLogoutLink() {
    return (
      <div className='loggedin-info'>
        <span>
          {/* Hi, {this.context.user.name}! */} Hi Owner!
        </span>
        <nav>
          <Link
            style={{ textDecoration: 'none'}}
            onClick={this.handleLogoutClick}
            to='/'>
            Logout
          </Link>
        </nav>
      </div>
    )
  }

  renderLoginLink() {
    return (
      <nav>
        <Link style={{ textDecoration: 'none'}} to='/login'>Login</Link>
        {' '}
        <Link style={{ textDecoration: 'none'}} to='/register'>Sign up</Link>
      </nav>
    )
  }

  render() {
    let display
    if (this.props.location.pathname !== '/member-dashboard') {
      display = <h1>
        {TokenService.hasAuthToken() ? (
          <Link to='/parent-dashboard' style={{ textDecoration: 'none' }}>
            ChoreRunner
        </Link>
        ) : (
            <Link to='/' style={{ textDecoration: 'none' }}>
              ChoreRunner
        </Link>
          )}
      </h1>
    }
    return (
      <>
        {/* <h1>
          <Link to='/' style={{ textDecoration: 'none'}}>
            ChoreRunner
          </Link>
        </h1> */}
        {display}
        {TokenService.hasAuthToken()
          ? this.renderLogoutLink()
          : this.renderLoginLink()}
      </>
    );
  }
}

export default Header
