import React, { Component } from 'react'
import createIsAuthenticated from 'hoc/is-authenticated'
import { withStyles } from '@material-ui/core/styles'
import { inject } from 'mobx-react'
import AddUserForm from 'components/home/add-user'
const styles = theme => ({})

@createIsAuthenticated({})
@inject(({ auth }) => ({
    register: ({ username, password, email }) =>
        auth.register({ username, password, email })
}))
class AddUser extends Component {
    render() {
        return <AddUserForm {...this.props} />
    }
}
export default withStyles(styles)(AddUser)
