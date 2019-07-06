import React, { Component } from 'react'
import createIsAuthenticated from 'hoc/is-authenticated'
import LoginForm from 'components/auth/login-form'

import { inject } from 'mobx-react'

@createIsAuthenticated({
    authRequired: false
})
@inject(({ auth }) => ({
    login: ({ username, password }) => auth.login({ username, password }),
    isLoggingIn: auth.isLoggingIn
}))
class LoginPage extends Component {
    render() {
        return (
            <div>
                <LoginForm
                    onLogin={this.props.login}
                    isLoggingIn={this.props.isLoggingIn}
                />
            </div>
        )
    }
}

export default LoginPage
