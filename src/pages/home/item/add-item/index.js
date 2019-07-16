import React, { Component } from 'react'
import createIsAuthenticated from 'hoc/is-authenticated'
import AddItem from 'components/home/item/add-item'

import { inject, observer } from 'mobx-react'

@createIsAuthenticated({})
@inject(({ item }) => ({
    addItem: object => item.addItem(object),
    isRequesting: item.isRequesting
}))
@observer
class AddItemPage extends Component {
    render() {
        return <AddItem {...this.props} />
    }
}
export default AddItemPage
