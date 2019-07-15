import React, { Component } from 'react'
import createIsAuthenticated from 'hoc/is-authenticated'
import AddWarehouse from 'components/home/warehouse/add-warehouse'

import { inject, observer } from 'mobx-react'

@createIsAuthenticated({})
@inject(({ wareHouse }) => ({
    addWarehouse: object => wareHouse.addWarehouse(object),
    isRequesting: wareHouse.isRequesting
}))
@observer
class AddWarehousePage extends Component {
    render() {
        return <AddWarehouse {...this.props} />
    }
}
export default AddWarehousePage
