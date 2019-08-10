import React, { Component } from 'react'
import createIsAuthenticated from 'hoc/is-authenticated'
import canReachAccess from 'hoc/can-reach'
import UpdateSupplier from 'components/home/supplier/update-supplier'

import { inject, observer } from 'mobx-react'

@createIsAuthenticated({})
@canReachAccess({ access: 'supplier' })
@inject(({ item, supplier }) => ({
    fetchAllItems: () => item.fetchAllItems(),
    items: JSON.parse(JSON.stringify(item.items)),
    fetchSupplier: ({ idSupplier }) => supplier.fetchSupplier({ idSupplier }),
    supplier: JSON.parse(JSON.stringify(supplier.supplier)),
    updateSupplier: object => supplier.updateSupplier(object),
    isRequesting: supplier.isRequesting
}))
@observer
class UpdateSupplierPage extends Component {
    componentDidMount = () => {
        this.props.fetchSupplier({
            idSupplier: this.props.match.params.idSupplier
        })
        this.props.fetchAllItems()
    }

    render() {
        let { items, supplier } = this.props
        if (!items.length || !supplier) return <div>isFetching...</div>
        return <UpdateSupplier {...this.props} />
    }
}
export default UpdateSupplierPage
