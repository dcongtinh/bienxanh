import React, { Component } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import createIsAuthenticated from 'hoc/is-authenticated'
import canReachAccess from 'hoc/can-reach'
import UpdateExport from 'components/home/export/update-export'

import { inject, observer } from 'mobx-react'

@createIsAuthenticated({})
@canReachAccess({ access: 'order' })
@inject(({ order, item, wareHouse, exported, supplier, auth, alert }) => ({
    updateOrder: (object) => order.updateOrder(object),
    fetchExport: ({ idExported }) => exported.fetchExport({ idExported }),
    exported: JSON.parse(JSON.stringify(exported.exported)),
    setExport: (object) => exported.setExport(object),
    isRequesting: exported.isRequesting,
    fetchAllItems: () => item.fetchAllItems(),
    items: JSON.parse(JSON.stringify(item.items)),
    fetchAllWarehouses: () => wareHouse.fetchAllWarehouses(),
    wareHouses: JSON.parse(JSON.stringify(wareHouse.wareHouses)),
    fetchAllSuppliers: () => supplier.fetchAllSuppliers(),
    suppliers: JSON.parse(JSON.stringify(supplier.suppliers)),
    fetchAllUser: () => auth.fetchAllUser(),
    users: JSON.parse(JSON.stringify(auth.users)),
    exportReport: ({ exportIdList, callback }) =>
        exported.exportReport({ exportIdList, callback }),
    showAlert: ({ message, variant }) => alert.show({ message, variant }),
}))
@observer
class UpdateExportPage extends Component {
    componentDidMount = () => {
        this.props.fetchAllItems()
        this.props.fetchAllWarehouses()
        this.props.fetchAllSuppliers()
        this.props.fetchAllUser()
        this.props.fetchExport({
            idExported: this.props.match.params.idExported,
        })
    }

    render() {
        let { items, wareHouses, suppliers, exported, users } = this.props
        if (
            !items.length ||
            !wareHouses.length ||
            !suppliers.length ||
            !users ||
            !exported
        )
            return <CircularProgress />
        return <UpdateExport {...this.props} />
    }
}
export default UpdateExportPage
