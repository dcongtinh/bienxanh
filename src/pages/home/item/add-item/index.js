import React, { Component } from 'react'
import createIsAuthenticated from 'hoc/is-authenticated'
import createIsSiteAdmin from 'hoc/is-admin'
import AddItem from 'components/home/item/add-item'

import { inject, observer } from 'mobx-react'

@createIsAuthenticated({})
@createIsSiteAdmin({})
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
