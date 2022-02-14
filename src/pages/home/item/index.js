import React, { Component } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import createIsAuthenticated from 'hoc/is-authenticated'
import canReachAccess from 'hoc/can-reach'
import Item from 'components/home/item'
import { inject, observer } from 'mobx-react'

@createIsAuthenticated({})
@canReachAccess({ access: 'item' })
@inject(({ item, unit }) => ({
    fetchAllItems: () => item.fetchAllItems(),
    fetchAllUnits: () => unit.fetchAllUnits(),
    addItem: (object) => item.addItem(object),
    updateItem: (object) => item.updateItem(object),
    deleteItems: ({ itemsListId }) => item.deleteItems({ itemsListId }),
    items: JSON.parse(JSON.stringify(item.items)),
    units: JSON.parse(JSON.stringify(unit.units)),
    isRequesting: item.isRequesting,
}))
@observer
class ItemPage extends Component {
    componentDidMount() {
        this.props.fetchAllItems()
        this.props.fetchAllUnits()
    }

    render() {
        let { items, units } = this.props
        if (!items.length || !units.length) return <CircularProgress />
        return <Item {...this.props} />
    }
}
export default ItemPage
