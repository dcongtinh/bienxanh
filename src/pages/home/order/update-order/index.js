import React, { Component } from 'react'
import createIsAuthenticated from 'hoc/is-authenticated'
import createIsSiteAdmin from 'hoc/is-admin'
import UpdateOrder from 'components/home/order/update-order'
import CircularProgress from '@material-ui/core/CircularProgress'

import { inject, observer } from 'mobx-react'

@createIsAuthenticated({})
@createIsSiteAdmin({})
@inject(({ wareHouse, item, order }) => ({
    fetchAllWarehouses: () => wareHouse.fetchAllWarehouses(),
    fetchAllItems: () => item.fetchAllItems(),
    wareHouses: JSON.parse(JSON.stringify(wareHouse.wareHouses)),
    items: JSON.parse(JSON.stringify(item.items)),
    addOrder: object => order.addOrder(object),
    fetchOrder: ({ idOrder }) => order.fetchOrder({ idOrder }),
    updateOrder: object => order.updateOrder(object),
    order: JSON.parse(JSON.stringify(order.order)),
    isRequesting: order.isRequesting
}))
@observer
class UpdateOrderPage extends Component {
    componentDidMount = () => {
        this.props.fetchAllWarehouses()
        this.props.fetchAllItems()
        this.props.fetchOrder({ idOrder: this.props.match.params.idOrder })
    }

    render() {
        let { wareHouses, items, order } = this.props
        if (!wareHouses || !items || !order)
            return (
                <CircularProgress
                    color="secondary"
                    style={{
                        position: 'absolute',
                        width: '24px !important',
                        height: '24px !important'
                    }}
                />
            )
        return <UpdateOrder {...this.props} />
    }
}
export default UpdateOrderPage
