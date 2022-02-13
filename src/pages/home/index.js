import React, { Component } from 'react'
import createIsAuthenticated from 'hoc/is-authenticated'

@createIsAuthenticated({})
class HomePage extends Component {
    render() {
        return <div>Dashboard</div>
    }
}

export default HomePage
