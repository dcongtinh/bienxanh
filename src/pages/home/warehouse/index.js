import React, { Component } from 'react'
import createIsAuthenticated from 'hoc/is-authenticated'
import canReachAccess from 'hoc/can-reach'
import Warehouse from 'components/home/warehouse'
import CircularProgress from '@material-ui/core/CircularProgress'
import { inject, observer } from 'mobx-react'
import queryString from 'query-string'
@createIsAuthenticated({})
@canReachAccess({ access: 'warehouse' })
@inject(({ wareHouse }) => ({
    showAllWarehouses: query => wareHouse.showAllWarehouses(query),
    // fetchAllWarehouses: () => wareHouse.fetchAllWarehouses(),
    deleteWareHouses: ({ wareHousesListId }) =>
        wareHouse.deleteWareHouses({ wareHousesListId }),
    wareHouses: JSON.parse(JSON.stringify(wareHouse.wareHouses)),
    wareHousesTotal: wareHouse.wareHousesTotal,
    isRequesting: wareHouse.isRequesting
}))
@observer
class WarehousePage extends Component {
    componentDidMount() {
        const query = queryString.parse(this.props.location.search)
        // this.props.fetchAllWarehouses(query)
        this.props.showAllWarehouses(query)
    }

    render() {
        let { wareHouses, wareHousesTotal } = this.props
        if (!wareHouses || !wareHousesTotal) return <CircularProgress />
        return <Warehouse {...this.props} />
    }
}
export default WarehousePage
