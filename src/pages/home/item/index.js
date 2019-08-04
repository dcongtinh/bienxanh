import React, { Component } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import createIsAuthenticated from 'hoc/is-authenticated'
import canReachAccess from 'hoc/can-reach'
import Item from 'components/home/item'
import { inject, observer } from 'mobx-react'

@createIsAuthenticated({})
@canReachAccess({ access: 'item' })
@inject(({ item }) => ({
    fetchAllItems: () => item.fetchAllItems(),
    deleteItems: ({ itemsListId }) => item.deleteItems({ itemsListId }),
    items: JSON.parse(JSON.stringify(item.items)),
    isRequesting: item.isRequesting
}))
@observer
class ItemPage extends Component {
    componentDidMount() {
        this.props.fetchAllItems()
    }

    render() {
        if (!this.props.items) return <CircularProgress />
        return <Item {...this.props} />
    }
}
export default ItemPage
