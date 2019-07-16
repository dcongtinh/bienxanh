import React, { Component } from 'react'
import createIsAuthenticated from 'hoc/is-authenticated'
import { withStyles } from '@material-ui/core/styles'
import OrderForm from 'components/home/order'
const styles = theme => ({})

@createIsAuthenticated({})
class OrderPage extends Component {
    render() {
        return <OrderForm {...this.props} />
    }
}
export default withStyles(styles)(OrderPage)
