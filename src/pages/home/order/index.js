import React, { Component } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import createIsAuthenticated from 'hoc/is-authenticated'
import canReachAccess from 'hoc/can-reach'
import Order from 'components/home/order'
import { inject, observer } from 'mobx-react'

@createIsAuthenticated({})
@canReachAccess({ access: 'order' })
@inject(({ order, auth }) => ({
    fetchMe: () => auth.fetchMe(),
    fetchAllOrders: () => order.fetchAllOrders(),
    addOrder: object => order.addOrder(object),
    deleteOrders: ({ ordersListId, callback }) =>
        order.deleteOrders({ ordersListId, callback }),
    mergeOrders: ({ ordersListId, enabled, callback }) =>
        order.mergeOrders({ ordersListId, enabled, callback }),
    updateOrder: object => order.updateOrder(object),
    orders: JSON.parse(JSON.stringify(order.orders)),
    count: order.count,
    hasFetched: order.hasFetched,
    isRequesting: order.isRequesting,
    me: JSON.parse(JSON.stringify(auth.me)),
    meHasFetched: auth.hasFetched
}))
@observer
class OrderPage extends Component {
    componentDidMount() {
        if (!this.props.meHasFetched) this.props.fetchMe()
        this.props.fetchAllOrders()
    }

    render() {
        let { isRequesting, me } = this.props
        if (isRequesting || !me) return <CircularProgress />
        return <Order {...this.props} />
    }
}
export default OrderPage
