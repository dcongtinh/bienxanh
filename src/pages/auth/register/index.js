import React, { Component } from 'react'
import createIsAuthenticated from 'hoc/is-authenticated'
import { inject } from 'mobx-react'
import RegisterForm from 'components/auth/register-form'

@createIsAuthenticated({
    authRequired: false
})
@inject(({ auth }) => ({
    register: ({ username, password, email }) =>
        auth.register({ username, password, email })
}))
class Register extends Component {
    render() {
        return (
            <div>
                <RegisterForm {...this.props} />
            </div>
        )
    }
}

export default Register
