import React, { Component } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import createIsAuthenticated from 'hoc/is-authenticated'
import canReachAccess from 'hoc/can-reach'
import UpdateOrder from 'components/home/order/update-order'

import { inject, observer } from 'mobx-react'

@createIsAuthenticated({})
@canReachAccess({ access: 'order' })
@inject(({ auth, wareHouse, item, order, supplier }) => ({
    fetchAllUser: () => auth.fetchAllUser(),
    users: JSON.parse(JSON.stringify(auth.users)),
    fetchAllWarehouses: () => wareHouse.fetchAllWarehouses(),
    fetchAllItems: () => item.fetchAllItems(),
    wareHouses: JSON.parse(JSON.stringify(wareHouse.wareHouses)),
    items: JSON.parse(JSON.stringify(item.items)),
    addOrder: object => order.addOrder(object),
    fetchOrder: ({ idOrder }) => order.fetchOrder({ idOrder }),
    updateOrder: object => order.updateOrder(object),
    deleteOrders: ({ ordersListId }) => order.deleteOrders({ ordersListId }),
    order: JSON.parse(JSON.stringify(order.order)),
    fetchAllSuppliers: () => supplier.fetchAllSuppliers(),
    suppliers: JSON.parse(JSON.stringify(supplier.suppliers)),
    isRequesting: order.isRequesting
}))
@observer
class UpdateOrderPage extends Component {
    componentDidMount = () => {
        this.props.fetchAllWarehouses()
        this.props.fetchAllItems()
        this.props.fetchOrder({ idOrder: this.props.match.params.idOrder })
        this.props.fetchAllSuppliers()
        this.props.fetchAllUser()
    }

    render() {
        let { wareHouses, items, order, suppliers, users } = this.props
        if (
            !wareHouses.length ||
            !items.length ||
            !order ||
            !suppliers.length ||
            !users.length
        )
            return <CircularProgress />
        return <UpdateOrder {...this.props} />
    }
}
export default UpdateOrderPage
