import React, { Component } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import createIsAuthenticated from 'hoc/is-authenticated'
import Order from 'components/home/order'
import { inject, observer } from 'mobx-react'

@createIsAuthenticated({})
@inject(({ order }) => ({
    fetchAllOrders: props => order.fetchAllOrders(props),
    deleteOrders: ({ ordersListId }) => order.deleteOrders({ ordersListId }),
    orders: JSON.parse(JSON.stringify(order.orders)),
    count: order.count,
    isRequesting: order.isRequesting
}))
@observer
class OrderPage extends Component {
    componentDidMount() {
        this.props.fetchAllOrders({})
    }

    render() {
        // if (this.props.isRequesting) return <CircularProgress />
        return <Order {...this.props} />
    }
}
export default OrderPage
