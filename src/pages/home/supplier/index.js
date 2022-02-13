import React, { Component } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import createIsAuthenticated from 'hoc/is-authenticated'
import canReachAccess from 'hoc/can-reach'
import Supplier from 'components/home/supplier'
import { inject, observer } from 'mobx-react'

@createIsAuthenticated({})
@canReachAccess({ access: 'supplier' })
@inject(({ supplier }) => ({
    fetchAllSuppliers: () => supplier.fetchAllSuppliers(),
    deleteSuppliers: ({ suppliersListId }) =>
        supplier.deleteSuppliers({ suppliersListId }),
    suppliers: JSON.parse(JSON.stringify(supplier.suppliers)),
    isRequesting: supplier.isRequesting,
}))
@observer
class SupplierPage extends Component {
    componentDidMount() {
        this.props.fetchAllSuppliers()
    }

    render() {
        if (!this.props.suppliers.length) return <CircularProgress />
        return <Supplier {...this.props} />
    }
}
export default SupplierPage
