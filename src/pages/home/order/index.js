import React, { Component } from 'react'
import createIsAuthenticated from 'hoc/is-authenticated'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({})

@createIsAuthenticated({})
class Order extends Component {
    render() {
        return <div>Order</div>
    }
}
export default withStyles(styles)(Order)
