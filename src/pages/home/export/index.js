import React, { Component } from 'react'
// import CircularProgress from '@material-ui/core/CircularProgress'
import createIsAuthenticated from 'hoc/is-authenticated'
import canReachAccess from 'hoc/can-reach'
import Export from 'components/home/export'
import { inject, observer } from 'mobx-react'
import queryString from 'query-string'
@createIsAuthenticated({})
@canReachAccess({ access: 'order' })
@inject(({ exported }) => ({
    fetchAllExports: query => exported.fetchAllExports(query),
    exportList: JSON.parse(JSON.stringify(exported.exports)),
    exportedListId: JSON.parse(JSON.stringify(exported.exportedListId)),
    exportsTotal: exported.exportsTotal,
    deleteExports: object => exported.deleteExports(object),
    isRequesting: exported.isRequesting
}))
@observer
class ExportPage extends Component {
    componentDidMount() {
        const query = queryString.parse(this.props.location.search)
        this.props.fetchAllExports(query)
    }

    render() {
        let { exportList, exportedListId, exportsTotal } = this.props
        if (!exportList.length || !exportedListId.length || !exportsTotal)
            return <div>Chưa có hoá đơn nào đã xuất...</div>
        return <Export {...this.props} />
    }
}
export default ExportPage
