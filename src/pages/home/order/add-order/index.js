import React, { Component } from 'react'
import createIsAuthenticated from 'hoc/is-authenticated'
import AddOrder from 'components/home/order/add-order'

import { inject, observer } from 'mobx-react'

@createIsAuthenticated({})
@inject(({ wareHouse, item }) => ({
    fetchAllWarehouses: () => wareHouse.fetchAllWarehouses(),
    fetchAllItems: () => item.fetchAllItems(),
    wareHouses: JSON.parse(JSON.stringify(wareHouse.wareHouses)),
    items: JSON.parse(JSON.stringify(item.items))
    // addWarehouse: object => wareHouse.addWarehouse(object),
}))
@observer
class AddOrderPage extends Component {
    componentDidMount = () => {
        this.props.fetchAllWarehouses()
        this.props.fetchAllItems()
    }

    render() {
        let { wareHouses, items } = this.props
        if (!wareHouses || !items) return <div>isFetching...</div>
        return <AddOrder {...this.props} />
    }
}
export default AddOrderPage
