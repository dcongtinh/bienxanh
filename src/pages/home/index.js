import React, { Component } from 'react'
import createIsAuthenticated from 'hoc/is-authenticated'

@createIsAuthenticated({})
class HomePage extends Component {
    render() {
        return <div>Home Page : {this.props.hello}</div>
    }
}

export default HomePage
