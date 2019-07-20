import React, { Component } from 'react'
import createIsAuthenticated from 'hoc/is-authenticated'
import createIsSiteAdmin from 'hoc/is-admin'
import UpdateOrder from 'components/home/order/update-order'

import { inject, observer } from 'mobx-react'

@createIsAuthenticated({})
@createIsSiteAdmin({})
@inject(({ auth, wareHouse, item, order }) => ({
    fetchMe: () => auth.fetchMe(),
    fetchAllWarehouses: () => wareHouse.fetchAllWarehouses(),
    fetchAllItems: () => item.fetchAllItems(),
    wareHouses: JSON.parse(JSON.stringify(wareHouse.wareHouses)),
    items: JSON.parse(JSON.stringify(item.items)),
    me: JSON.parse(JSON.stringify(auth.me)),
    meHasFetched: auth.hasFetched,
    addOrder: object => order.addOrder(object),
    isRequesting: order.isRequesting
}))
@observer
class UpdateOrderPage extends Component {
    componentDidMount = () => {
        if (!this.props.meHasFetched) this.props.fetchMe()
        this.props.fetchAllWarehouses()
        this.props.fetchAllItems()
    }

    render() {
        let { wareHouses, items, me } = this.props
        if (!wareHouses || !items || !me) return <div>isFetching...</div>
        return <UpdateOrder {...this.props} />
    }
}
export default UpdateOrderPage
