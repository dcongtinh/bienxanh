import React, { Component } from 'react'
import createIsAuthenticated from 'hoc/is-authenticated'
import Warehouse from 'components/home/warehouse'
import { inject, observer } from 'mobx-react'

@createIsAuthenticated({})
@inject(({ wareHouse }) => ({
    fetchAllWarehouses: () => wareHouse.fetchAllWarehouses(),
    deleteWareHouses: ({ wareHousesListId }) =>
        wareHouse.deleteWareHouses({ wareHousesListId }),
    wareHouses: JSON.parse(JSON.stringify(wareHouse.wareHouses)),
    isRequesting: wareHouse.isRequesting
}))
@observer
class WarehousePage extends Component {
    componentDidMount() {
        this.props.fetchAllWarehouses()
    }

    render() {
        if (!this.props.wareHouses) return <div>is Fetching...</div>
        return <Warehouse {...this.props} />
    }
}
export default WarehousePage
