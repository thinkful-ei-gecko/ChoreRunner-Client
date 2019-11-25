import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './landing.css'

export default class Landing extends Component {
    render() {
        return (
            <div>
                <h1>Chore Runner</h1>

                <h2>About</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna. Aenean velit odio, elementum in tempus ut, vehicula eu diam. Pellentesque rhoncus aliquam mattis. Ut vulputate eros sed felis sodales nec vulputate justo hendrerit. Vivamus varius pretium ligula, a aliquam odio euismod sit amet. Quisque laoreet sem sit amet orci ullamcorper at ultricies metus viverra. Pellentesque arcu mauris, malesuada quis ornare accumsan, blandit sed diam.</p> 

                <div className='img-placeholder'>IMAGE/VIDEO PLACEHOLDER</div> 
                <div className='img-placeholder'> IMAGE/VIDEO PLACEHOLDER</div> 

                <Link tabIndex={1 } style={{ textDecoration: 'none' }} to='/kigLogin'>I am a kid</Link>
                <Link tabIndex={2 } style={{ textDecoration: 'none' }} to='/parentLogin'>I am a parent</Link>
                <Link tabIndex={3 } style={{ textDecoration: 'none' }} to='/register'>I am new</Link>

            </div>
        )
    }
}
