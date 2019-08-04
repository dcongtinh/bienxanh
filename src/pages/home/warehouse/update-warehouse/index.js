import React, { Component } from 'react'
import createIsAuthenticated from 'hoc/is-authenticated'
import canReachAccess from 'hoc/can-reach'
import UpdateWarehouse from 'components/home/warehouse/update-warehouse'
import CircularProgress from '@material-ui/core/CircularProgress'
import { inject, observer } from 'mobx-react'

@createIsAuthenticated({})
@canReachAccess({ access: 'warehouse' })
@inject(({ wareHouse }) => ({
    fetchWarehouse: ({ idWarehouse }) =>
        wareHouse.fetchWarehouse({ idWarehouse }),
    updateWarehouse: object => wareHouse.updateWarehouse(object),
    wareHouse: JSON.parse(JSON.stringify(wareHouse.wareHouse)),
    isRequesting: wareHouse.isRequesting
}))
@observer
class UpdateWarehousePage extends Component {
    componentDidMount = () => {
        this.props.fetchWarehouse({
            idWarehouse: this.props.match.params.idWarehouse
        })
    }

    render() {
        if (!this.props.wareHouse) return <CircularProgress />
        return <UpdateWarehouse {...this.props} />
    }
}
export default UpdateWarehousePage
