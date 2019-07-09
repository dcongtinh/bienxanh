import React, { Component } from 'react'
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
    updateProfile: ({ username, firstname, lastname }) =>
        auth.updateProfile({ username, firstname, lastname })
}))
@observer
class ProfilePage extends Component {
    async componentDidMount() {
        this.props.fetchUser({ username: this.props.match.params.username })
    }
    render() {
        return <Profile {...this.props} />
    }
}
export default ProfilePage
