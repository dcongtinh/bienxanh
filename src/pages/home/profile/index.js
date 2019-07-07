import React, { Component } from 'react'
import createIsAuthenticated from 'hoc/is-authenticated'
import { withStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
const styles = theme => ({})

@createIsAuthenticated({})
@inject(({ auth }) => ({
    fetchMe: () => auth.fetchMe(),
    me: auth.me,
    isAuthenticated: auth.isAuthenticated
}))
@observer
class Profile extends Component {
    render() {
        return <div>Profile</div>
    }
}
export default withStyles(styles)(Profile)
