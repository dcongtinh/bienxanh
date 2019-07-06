import React from 'react'
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

@inject(({ auth }) => ({
    me: auth.me,
    logout: () => auth.logout(),
    isAuthenticated: auth.isAuthenticated
}))
@observer
class Header extends React.Component {
    render() {
        if (!this.props.isAuthenticated) return null
        return (
            <div>
                <h4>Hi, {this.props.me.username}</h4>
                <Link to="/">Home</Link>
                {!this.props.isAuthenticated && (
                    <>
                        <Link to="/auth/login">Login</Link>
                        <Link to="/auth/register">Register</Link>
                    </>
                )}
                <div onClick={this.props.logout}>Logout</div>
            </div>
        )
    }
}

export default Header
