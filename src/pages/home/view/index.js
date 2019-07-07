import React, { Component } from 'react'
import createIsAuthenticated from 'hoc/is-authenticated'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({})

@createIsAuthenticated({})
class View extends Component {
    render() {
        return <div>View</div>
    }
}
export default withStyles(styles)(View)
