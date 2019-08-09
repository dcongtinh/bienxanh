import React, { Component } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import createIsAuthenticated from 'hoc/is-authenticated'
import canReachAccess from 'hoc/can-reach'
import ViewItem from 'components/home/item/view-item'
import { inject, observer } from 'mobx-react'

@createIsAuthenticated({})
@canReachAccess({ access: 'item' })
@inject(({ wareHouse, item }) => ({
    fetchAllWarehouses: () => wareHouse.fetchAllWarehouses(),
    wareHouses: JSON.parse(JSON.stringify(wareHouse.wareHouses)),
    fetchItem: ({ idItem }) => item.fetchItem({ idItem }),
    updateItem: object => item.updateItem(object),
    deleteItems: ({ itemsListId }) => item.deleteItems({ itemsListId }),
    item: JSON.parse(JSON.stringify(item.item))
    // isRequesting: item.isRequesting
}))
@observer
class ViewItemPage extends Component {
    componentDidMount() {
        this.props.fetchItem({
            idItem: this.props.match.params.idItem
        })
        this.props.fetchAllWarehouses()
    }

    render() {
        if (!this.props.item || !this.props.wareHouses.length)
            return <CircularProgress />
        return <ViewItem {...this.props} />
    }
}
export default ViewItemPage
