import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import styled from 'styled-components'

const Container = styled.div`
    background: red;
`

@inject(({ auth }) => ({
    isAuthenticated: auth.isAuthenticated,
    login: () => auth.login()
}))
@observer
class Home extends Component {
    componentDidMount() {
        console.log(process.env)
    }

    render() {
        return (
            <Container>
                <div>Home : {this.props.isAuthenticated ? 'yes' : 'no'}</div>
                <button onClick={() => this.props.login()}>Login</button>
            </Container>
        )
    }
}

export default Home
