import React, { Component } from 'react'
import createIsAuthenticated from 'hoc/is-authenticated'
import canReachAccess from 'hoc/can-reach'
import AddSupplier from 'components/home/supplier/add-supplier'

import { inject, observer } from 'mobx-react'

@createIsAuthenticated({})
@canReachAccess({ access: 'supplier' })
@inject(({ item, supplier }) => ({
    fetchAllItems: () => item.fetchAllItems(),
    items: JSON.parse(JSON.stringify(item.items)),
    addSupplier: (object) => supplier.addSupplier(object),
    isRequesting: supplier.isRequesting,
}))
@observer
class AddSupplierPage extends Component {
    componentDidMount = () => {
        this.props.fetchAllItems()
    }

    render() {
        let { items } = this.props
        if (!items.length) return <div>isFetching...</div>
        return <AddSupplier {...this.props} />
    }
}
export default AddSupplierPage
