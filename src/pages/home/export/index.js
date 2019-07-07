import React, { Component } from 'react'
import createIsAuthenticated from 'hoc/is-authenticated'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({})

@createIsAuthenticated({})
class Export extends Component {
    render() {
        return <div>Export</div>
    }
}
export default withStyles(styles)(Export)
