import React, { Component } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import createIsAuthenticated from 'hoc/is-authenticated'
import canReachAccess from 'hoc/can-reach'
import Export from 'components/DownloadExcel/Export'
import { inject, observer } from 'mobx-react'

@createIsAuthenticated({})
@canReachAccess({ access: 'order' })
@inject(({ wareHouse, supplier, auth }) => ({
    fetchAllSuppliers: () => supplier.fetchAllSuppliers(),
    suppliers: JSON.parse(JSON.stringify(supplier.suppliers)),
    fetchAllUser: () => auth.fetchAllUser(),
    users: JSON.parse(JSON.stringify(auth.users)),
    fetchAllWarehouses: () => wareHouse.fetchAllWarehouses(),
    wareHouses: JSON.parse(JSON.stringify(wareHouse.wareHouses))
}))
@observer
class ExportExcelPage extends Component {
    componentDidMount() {
        this.props.fetchAllWarehouses()
        this.props.fetchAllSuppliers()
        this.props.fetchAllUser()
    }

    render() {
        let { wareHouses, suppliers, users } = this.props
        if (!wareHouses.length || !suppliers.length || !users.length)
            return <CircularProgress />
        let whName = {},
            supplierName = {},
            userName = {}
        wareHouses.forEach(warehouse => {
            whName[warehouse._id] = {
                warehouse: warehouse.warehouse,
                warehouseName: warehouse.warehouseName,
                buyerCode: warehouse.buyerCode
            }
        })
        suppliers.forEach(supplier => {
            supplierName[supplier._id] = supplier.supplierCode
        })
        users.forEach(user => {
            userName[user._id] = user.lastname
        })
        return (
            <Export
                whName={whName}
                supplierName={supplierName}
                userName={userName}
                {...this.props}
            />
        )
    }
}
export default ExportExcelPage
