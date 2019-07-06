import React from 'react'
import { inject, observer } from 'mobx-react'
import { Redirect } from 'react-router-dom'

const createIsAuthenticated = ({ authRequired = true }) => Component => {
    @inject(({ auth }) => ({
        fetchMe: () => auth.fetchMe(),
        isFetching: auth.isFetchingMe,
        isAuthenticated: auth.isAuthenticated
    }))
    @observer
    class Authenticated extends React.Component {
        async componentDidMount() {
            this.props.fetchMe()
        }

        render() {
            if (this.props.isFetching) {
                return <div>Loading ...</div>
            }
            if (
                authRequired &&
                !this.props.isFetching &&
                !this.props.isAuthenticated
            ) {
                return <Redirect to={'/auth/login'} />
            }
            if (
                !authRequired &&
                !this.props.isFetching &&
                this.props.isAuthenticated
            ) {
                return <Redirect to={'/'} />
            }
            return <Component {...this.props} hello="world" />
        }
    }

    return Authenticated
}

export default createIsAuthenticated
