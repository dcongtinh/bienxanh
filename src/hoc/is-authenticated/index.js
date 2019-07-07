import React from 'react'
import { inject, observer } from 'mobx-react'
import { Redirect } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress'
import { withStyles } from '@material-ui/core/styles'

const createIsAuthenticated = ({ authRequired = true }) => Component => {
    const styles = theme => ({
        circularProgress: {
            width: 80,
            height: 80,
            position: 'absolute',
            top: '45%',
            left: '50%'
        }
    })
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
            let { classes, isAuthenticated, isFetching } = this.props
            if (isFetching) {
                return <CircularProgress className={classes.circularProgress} />
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

    return withStyles(styles)(Authenticated)
}

export default createIsAuthenticated
