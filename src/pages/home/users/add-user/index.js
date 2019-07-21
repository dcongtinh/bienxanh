import React, { Component } from 'react'
// import createIsAuthenticated from 'hoc/is-authenticated'
// import createIsSiteAdmin from 'hoc/is-admin'
import { withStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import AddUserForm from 'components/home/users/add-user'
const styles = theme => ({})

// @createIsAuthenticated({})
// @createIsSiteAdmin({})
@inject(({ auth, alert }) => ({
    register: object => auth.register(object),
    isRequesting: auth.isRequesting
}))
@observer
class AddUser extends Component {
    render() {
        return <AddUserForm {...this.props} />
    }
}
export default withStyles(styles)(AddUser)
