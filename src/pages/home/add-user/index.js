import React, { Component } from 'react'
import createIsAuthenticated from 'hoc/is-authenticated'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({})

@createIsAuthenticated({})
class AddUser extends Component {
    render() {
        return <div>AddUser</div>
    }
}
export default withStyles(styles)(AddUser)
