import React, { Component } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import createIsAuthenticated from 'hoc/is-authenticated'
import canReachAccess from 'hoc/can-reach'
import Export from 'components/home/export'
import { inject, observer } from 'mobx-react'

@createIsAuthenticated({})
@canReachAccess({ access: 'order' })
@inject(({ exported }) => ({
    fetchAllExports: () => exported.fetchAllExports(),
    exportList: JSON.parse(JSON.stringify(exported.exports)),
    isRequesting: exported.isRequesting
}))
@observer
class ExportPage extends Component {
    componentDidMount() {
        this.props.fetchAllExports()
    }

    render() {
        if (!this.props.exportList) return <CircularProgress />
        if (!this.props.exportList.length)
            return <div>Chưa có hoá đơn nào đã xuất</div>
        return <Export {...this.props} />
    }
}
export default ExportPage
