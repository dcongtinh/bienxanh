import React, { Component } from 'react'
import Header from 'components/layout/header'

export default class BaseLayout extends Component {
    render() {
        return (
            <div>
                <Header />
                <div>{this.props.children}</div>
            </div>
        )
    }
}
