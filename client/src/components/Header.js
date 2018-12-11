import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Header extends Component {
  renderContent () {
    switch (this.props.auth) {
      case null:
        return <span>Null</span>
      case false:
        return (
          <li>
            <a href={'/auth/google'}>Login with Google</a>
          </li>
        )
      default:
        return [
          <li key="3" style={{ margin: '0 10px' }}>
            <Link to="/blogs">My Blogs</Link>
          </li>,
          <li key="2">
            <a href={'/auth/logout'}>Logout</a>
          </li>
        ]
    }
  }
  render () {
    return (
      <nav className="indigo">
        <div className="nav-wrapper">
          <Link
            to="/"
            className="left brand-logo"
            style={{ marginLeft: '10px' }}
            >
            Blogster
          </Link>
          <ul className="right">
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    )
  }
}

function mapStateToProps({ auth }) {
  return { auth }
}

export default connect(mapStateToProps)(Header)