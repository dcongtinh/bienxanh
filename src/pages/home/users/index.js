import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import createIsAuthenticated from 'hoc/is-authenticated'
import canReachAccess from 'hoc/can-reach'
import CircularProgress from '@material-ui/core/CircularProgress'
import Users from 'components/home/users'

@createIsAuthenticated({})
@canReachAccess({ access: 'user' })
@inject(({ auth }) => ({
    fetchAllUser: () => auth.fetchAllUser(),
    users: JSON.parse(JSON.stringify(auth.users)),
    deleteUsers: ({ usernames }) => auth.deleteUsers({ usernames }),
}))
@observer
class UsersPage extends Component {
    componentDidMount = () => {
        this.props.fetchAllUser()
    }

    render() {
        if (!this.props.users) return <CircularProgress />
        return <Users {...this.props} />
    }
}

export default UsersPage
