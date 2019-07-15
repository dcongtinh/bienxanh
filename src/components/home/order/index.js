import React, { Component } from 'react'
import createIsAuthenticated from 'hoc/is-authenticated'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({})

@createIsAuthenticated({})
class Warehouse extends Component {
    render() {
        return <div>Nhập kho</div>
    }
}
export default withStyles(styles)(Warehouse)
