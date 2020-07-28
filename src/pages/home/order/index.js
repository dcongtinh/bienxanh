import React, { Component } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import createIsAuthenticated from 'hoc/is-authenticated'
import canReachAccess from 'hoc/can-reach'
import Order from 'components/home/order'
import { inject, observer } from 'mobx-react'

@createIsAuthenticated({})
@canReachAccess({ access: 'order' })
@inject(({ order, item, auth, exported, alert }) => ({
    fetchMe: () => auth.fetchMe(),
    fetchAllOrders: () => order.fetchAllOrders(),
    addOrder: (object) => order.addOrder(object),
    addOrders: (object) => order.addOrders(object),
    deleteOrders: ({ ordersListId, callback }) =>
        order.deleteOrders({ ordersListId, callback }),
    mergeOrders: ({ ordersListId, enabled, callback }) =>
        order.mergeOrders({ ordersListId, enabled, callback }),
    updateOrder: (object) => order.updateOrder(object),
    exportOrders: (object) => order.exportOrders(object),
    orders: JSON.parse(JSON.stringify(order.orders)),
    group: order.group,
    hasFetched: order.hasFetched,
    isRequesting: order.isRequesting,
    me: JSON.parse(JSON.stringify(auth.me)),
    meHasFetched: auth.hasFetched,
    fetchAllItems: () => item.fetchAllItems(),
    items: JSON.parse(JSON.stringify(item.items)),
    exportReport: ({ exportIdList, callback }) =>
        exported.exportReport({ exportIdList, callback }),
    showAlert: ({ message, variant }) => alert.show({ message, variant }),
}))
@observer
class OrderPage extends Component {
    componentDidMount() {
        if (!this.props.meHasFetched) this.props.fetchMe()
        this.props.fetchAllOrders()
        this.props.fetchAllItems()
    }

    render() {
        let { isRequesting, items, me } = this.props
        if (isRequesting || !items.length || !me) return <CircularProgress />
        return <Order {...this.props} />
    }
}
export default OrderPage
