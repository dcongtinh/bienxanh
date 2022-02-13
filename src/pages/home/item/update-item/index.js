import React, { Component } from 'react'
import createIsAuthenticated from 'hoc/is-authenticated'
import canReachAccess from 'hoc/can-reach'
import UpdateItem from 'components/home/item/update-item'
import CircularProgress from '@material-ui/core/CircularProgress'
import { inject, observer } from 'mobx-react'

@createIsAuthenticated({})
@canReachAccess({ access: 'item' })
@inject(({ item, wareHouse }) => ({
    fetchItem: ({ idItem }) => item.fetchItem({ idItem }),
    updateItem: object => item.updateItem(object),
    fetchAllWarehouses: () => wareHouse.fetchAllWarehouses(),
    deleteItems: ({ itemsListId }) => item.deleteItems({ itemsListId }),
    wareHouses: JSON.parse(JSON.stringify(wareHouse.wareHouses)),
    item: JSON.parse(JSON.stringify(item.item)),
    isRequesting: item.isRequesting
}))
@observer
class UpdateItemPage extends Component {
    componentDidMount = () => {
        this.props.fetchItem({
            idItem: this.props.match.params.idItem
        })
        this.props.fetchAllWarehouses()
    }

    render() {
        if (!this.props.item || !this.props.wareHouses)
            return <CircularProgress />
        return <UpdateItem {...this.props} />
    }
}
export default UpdateItemPage
