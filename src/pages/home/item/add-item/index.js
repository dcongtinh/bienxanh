import React, { Component } from 'react'
import createIsAuthenticated from 'hoc/is-authenticated'
import canReachAccess from 'hoc/can-reach'
import AddItem from 'components/home/item/add-item'

import { inject, observer } from 'mobx-react'

@createIsAuthenticated({})
@canReachAccess({ access: 'item' })
@inject(({ item, wareHouse }) => ({
    addItem: object => item.addItem(object),
    fetchAllWarehouses: () => wareHouse.fetchAllWarehouses(),
    wareHouses: JSON.parse(JSON.stringify(wareHouse.wareHouses)),
    isRequesting: item.isRequesting
}))
@observer
class AddItemPage extends Component {
    componentDidMount = () => {
        this.props.fetchAllWarehouses()
    }

    render() {
        if (!this.props.wareHouses) return <div>isFetching...</div>
        return <AddItem {...this.props} />
    }
}
export default AddItemPage
