import React, { Component } from 'react'
import createIsAuthenticated from 'hoc/is-authenticated'
import UpdateItem from 'components/home/item/update-item'

import { inject, observer } from 'mobx-react'

@createIsAuthenticated({})
@inject(({ item }) => ({
    fetchItem: ({ idItem }) => item.fetchItem({ idItem }),
    updateItem: object => item.updateItem(object),
    item: JSON.parse(JSON.stringify(item.item)),
    isRequesting: item.isRequesting
}))
@observer
class UpdateItemPage extends Component {
    componentDidMount = () => {
        this.props.fetchItem({
            idItem: this.props.match.params.idItem
        })
    }

    render() {
        if (!this.props.item) return <div>isFetching...</div>
        return <UpdateItem {...this.props} />
    }
}
export default UpdateItemPage
