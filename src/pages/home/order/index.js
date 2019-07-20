import React, { Component } from 'react'
import createIsAuthenticated from 'hoc/is-authenticated'
import Order from 'components/home/order'
import { inject, observer } from 'mobx-react'

@createIsAuthenticated({})
@inject(({ order }) => ({
    fetchAllOrders: () => order.fetchAllOrders(),
    deleteOrders: ({ ordersListId }) => order.deleteOrders({ ordersListId }),
    orders: JSON.parse(JSON.stringify(order.orders)),
    isRequesting: order.isRequesting
}))
@observer
class OrderPage extends Component {
    componentDidMount() {
        this.props.fetchAllOrders()
    }

    render() {
        if (!this.props.orders) return <div>is Fetching...</div>
        return <Order {...this.props} />
    }
}
export default OrderPage
