import React, { Component } from 'react'
import createIsAuthenticated from 'hoc/is-authenticated'
import { withStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import AddUserForm from 'components/home/add-user'
const styles = theme => ({})

@createIsAuthenticated({})
@inject(({ auth, alert }) => ({
    register: object => auth.register(object),
    isRegistering: auth.isRegistering
}))
@observer
class AddUser extends Component {
    render() {
        return <AddUserForm {...this.props} />
    }
}
export default withStyles(styles)(AddUser)
