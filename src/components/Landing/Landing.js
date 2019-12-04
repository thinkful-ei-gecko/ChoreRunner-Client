import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Landing.css'

export default class Landing extends Component {
	render() {
		return (
			<div className='landing'>
				<h1>Chore Runner</h1>
				<p className="tagline">The Smart Shared To-Do List</p>
				<div className='header-background'>
					<h2>Nobody's Perfect</h2>
				</div>
	
				<p>Is it done? Whose turn was it to do the dishes anyway? Didn't you ask her to finish that two days ago? How did you forget this?</p>

				<p>Chores pile up around you like loud, hungry cats around an empty dish. You can only deal with one thing at a time. So you ask your family to step in. But delegating to them is a thankless, stressful job. There's also that one family member with constant amnesia and the other who remembers too much.</p>

				<p>So you've decided that having a system in place will clear things up. Everyone has to get on board, which also means you have to bribe them. Sounds great, right?</p>

				<p>ChoreRunner can help here. This app keeps track of the status of any given task and assigns it to whoever you want. It also creates incentives for the more reluctant members of your family by making it into a game.</p>

				<h2>How it Works</h2>

				<p>To get started, you sign up and set your households.  Your minions then create their accounts. Each member of the family can be assigned jobs. When they finish, they check it off themselves. If it's up to your standards, you confirm the item is complete.</p>

				<p>Here comes the fun part! ChoreRunner has a reward system in place for completing chores. You can assign point values to tasks. For example, doing the dishes could be worth 5 points, mowing the lawn worth 10. Your family members can level up with enough points. A ranking board lets everyone see who is the most on top of their chores.</p>

				<p>ChoreRunner will organize that busy to-do list into something a little more manageable. Everyone wants to help, so help them show you how!</p>

				<div className='img-placeholder'>IMAGE/VIDEO PLACEHOLDER</div>
				<div className='img-placeholder'> IMAGE/VIDEO PLACEHOLDER</div>

				<div className='button-container'>
					<Link className='kid-button' tabIndex={1} style={{ textDecoration: 'none' }} to='/kidLogin'>I am a kid</Link>
					<Link className='parent-button' tabIndex={2} style={{ textDecoration: 'none' }} to='/login'>I am a parent</Link>
					<Link className='new-button' tabIndex={3} style={{ textDecoration: 'none' }} to='/register'>I am new</Link>
				</div>

                {/* <Link tabIndex={1 } style={{ textDecoration: 'none' }} to='/kidLogin'>I am a kid</Link>
                <Link tabIndex={2 } style={{ textDecoration: 'none' }} to='/login'>I am a parent</Link>
                <Link tabIndex={3 } style={{ textDecoration: 'none' }} to='/register'>I am new</Link> */}

			</div>
		)
	}
}
