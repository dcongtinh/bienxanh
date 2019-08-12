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
    exportedListId: JSON.parse(JSON.stringify(exported.exportedListId)),
    deleteExports: object => exported.deleteExports(object),
    isRequesting: exported.isRequesting
}))
@observer
class ExportPage extends Component {
    componentDidMount() {
        this.props.fetchAllExports()
    }

    render() {
        let { exportList, exportedListId } = this.props
        if (!exportList || !exportedListId) return <CircularProgress />
        if (!exportList.length || !exportedListId.length)
            return <CircularProgress />
        return <Export {...this.props} />
    }
}
export default ExportPage
