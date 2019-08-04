import React, { Component } from 'react'
import createIsAuthenticated from 'hoc/is-authenticated'
import createIsSiteAdmin from 'hoc/is-admin'
import AddWarehouse from 'components/home/warehouse/add-warehouse'

import { inject, observer } from 'mobx-react'

@createIsAuthenticated({})
@createIsSiteAdmin({})
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
