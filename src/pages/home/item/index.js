import React, { Component } from 'react'
import createIsAuthenticated from 'hoc/is-authenticated'
import Item from 'components/home/item'
import { inject, observer } from 'mobx-react'

@createIsAuthenticated({})
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
        if (!this.props.items) return <div>is Fetching...</div>
        return <Item {...this.props} />
    }
}
export default ItemPage
