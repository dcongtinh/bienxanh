import React, { Component } from 'react'
import createIsAuthenticated from 'hoc/is-authenticated'
import canReachAccess from 'hoc/can-reach'
import AddOrder from 'components/home/order/add-order'
import CircularProgress from '@material-ui/core/CircularProgress'
import { inject, observer } from 'mobx-react'

@createIsAuthenticated({})
@canReachAccess({ access: 'order' })
@inject(({ auth, wareHouse, item, order, supplier }) => ({
    fetchMe: () => auth.fetchMe(),
    fetchAllUser: () => auth.fetchAllUser(),
    users: JSON.parse(JSON.stringify(auth.users)),
    fetchAllWarehouses: () => wareHouse.fetchAllWarehouses(),
    fetchAllItems: () => item.fetchAllItems(),
    wareHouses: JSON.parse(JSON.stringify(wareHouse.wareHouses)),
    items: JSON.parse(JSON.stringify(item.items)),
    me: JSON.parse(JSON.stringify(auth.me)),
    meHasFetched: auth.hasFetched,
    addOrder: (object) => order.addOrder(object),
    fetchAllSuppliers: () => supplier.fetchAllSuppliers(),
    suppliers: JSON.parse(JSON.stringify(supplier.suppliers)),
    isRequesting: order.isRequesting,
}))
@observer
class AddOrderPage extends Component {
    componentDidMount = () => {
        if (!this.props.meHasFetched) this.props.fetchMe()
        this.props.fetchAllWarehouses()
        this.props.fetchAllItems()
        this.props.fetchAllSuppliers()
        this.props.fetchAllUser()
    }

    render() {
        let { wareHouses, items, suppliers, users, me } = this.props
        if (
            !wareHouses.length ||
            !items.length ||
            !suppliers.length ||
            !users.length ||
            !me
        )
            return <CircularProgress />
        return <AddOrder {...this.props} />
    }
}
export default AddOrderPage
