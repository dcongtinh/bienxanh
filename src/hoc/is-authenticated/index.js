import React from 'react'
import { inject, observer } from 'mobx-react'
import { Redirect } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress'

const createIsAuthenticated = ({ authRequired = true }) => Component => {
    const circularProgress = {
        circularProgress: {
            width: 80,
            height: 80,
            position: 'absolute',
            top: '45%',
            left: '50%'
        }
    }

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
            let { isAuthenticated, isFetching } = this.props
            if (isFetching) {
                return <CircularProgress style={circularProgress} />
            }
            if (authRequired && !isFetching && !isAuthenticated) {
                return <Redirect to={'/auth/login'} />
            }
            if (!authRequired && !isFetching && isAuthenticated) {
                return <Redirect to="/" />
            }
            return <Component {...this.props} />
        }
    }

    return Authenticated
}

export default createIsAuthenticated
