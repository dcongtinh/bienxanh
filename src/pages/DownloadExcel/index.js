import React, { Component } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import createIsAuthenticated from 'hoc/is-authenticated'
import canReachAccess from 'hoc/can-reach'
import DownloadExcel from 'components/DownloadExcel/'
import { inject, observer } from 'mobx-react'

@createIsAuthenticated({})
@canReachAccess({ access: 'order' })
@inject(({ supplier }) => ({
    fetchAllSuppliers: () => supplier.fetchAllSuppliers(),
    suppliers: JSON.parse(JSON.stringify(supplier.suppliers))
}))
@observer
class DownloadExcelPage extends Component {
    componentDidMount() {
        this.props.fetchAllSuppliers()
    }

    render() {
        let { suppliers } = this.props
        if (!suppliers.length) return <CircularProgress />
        return <DownloadExcel {...this.props} />
    }
}
export default DownloadExcelPage
