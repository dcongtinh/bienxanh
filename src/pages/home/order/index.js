import React, { Component } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import createIsAuthenticated from 'hoc/is-authenticated'
import Order from 'components/home/order'
import { inject, observer } from 'mobx-react'

@createIsAuthenticated({})
@inject(({ order }) => ({
    fetchAllOrders: () => order.fetchAllOrders(),
    deleteOrders: ({ ordersListId }) => order.deleteOrders({ ordersListId }),
    updateOrder: object => order.updateOrder(object),
    orders: JSON.parse(JSON.stringify(order.orders)),
    count: order.count,
    hasFetched: order.hasFetched,
    isRequesting: order.isRequesting
}))
@observer
class OrderPage extends Component {
    componentDidMount() {
        this.props.fetchAllOrders()
    }

    render() {
        if (!this.props.orders.length) return <CircularProgress />
        return <Order {...this.props} />
    }
}
export default OrderPage
