import React, { Component } from 'react'
import createIsAuthenticated from 'hoc/is-authenticated'
import canReachAccess from 'hoc/can-reach'
import Warehouse from 'components/home/warehouse'
import CircularProgress from '@material-ui/core/CircularProgress'
import { inject, observer } from 'mobx-react'

@createIsAuthenticated({})
@canReachAccess({ access: 'warehouse' })
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
        if (!this.props.wareHouses) return <CircularProgress />
        return <Warehouse {...this.props} />
    }
}
export default WarehousePage
