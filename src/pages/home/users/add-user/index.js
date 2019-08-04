import React, { Component } from 'react'
import createIsAuthenticated from 'hoc/is-authenticated'
import canReachAccess from 'hoc/can-reach'
import { inject, observer } from 'mobx-react'
import AddUserForm from 'components/home/users/add-user'

@createIsAuthenticated({})
@canReachAccess({ access: 'user' })
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
export default AddUser
