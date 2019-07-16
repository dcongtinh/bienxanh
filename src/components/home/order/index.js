import React, { Component } from 'react'
import createIsAuthenticated from 'hoc/is-authenticated'

@createIsAuthenticated({})
class OrderForm extends Component {
    render() {
        return <div>Nhập ddown</div>
    }
}

export default OrderForm
