import React, { Component } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import createIsAuthenticated from 'hoc/is-authenticated'
import { inject, observer } from 'mobx-react'
import Profile from 'components/home/profile'

@createIsAuthenticated({})
@inject(({ auth }) => ({
    fetchMe: () => auth.fetchMe(),
    me: JSON.parse(JSON.stringify(auth.me)),
    isAuthenticated: auth.isAuthenticated,
    fetchUser: ({ username }) => auth.fetchUser({ username }),
    user: JSON.parse(JSON.stringify(auth.user)),
    updateProfile: ({ username, firstname, lastname, siteAdmin }) =>
        auth.updateProfile({ username, firstname, lastname, siteAdmin })
}))
@observer
class ProfilePage extends Component {
    componentDidMount() {
        this.props.fetchUser({ username: this.props.match.params.username })
    }
    render() {
        if (!this.props.user) return <CircularProgress />
        return <Profile {...this.props} />
    }
}
export default ProfilePage
