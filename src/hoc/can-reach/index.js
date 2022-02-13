import React from 'react'
import { inject, observer } from 'mobx-react'
import { Redirect } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress'

const canReachAccess =
    ({ access }) =>
    (Component) => {
        const circularProgress = {
            position: 'absolute',
            top: '45%',
            left: '50%',
        }

        @inject(({ auth }) => ({
            fetchMe: () => auth.fetchMe(),
            me: JSON.parse(JSON.stringify(auth.me)),
            isFetching: auth.isFetchingMe,
            hasFetched: auth.hasFetched,
        }))
        @observer
        class Access extends React.Component {
            async componentDidMount() {
                if (!this.props.hasFetched) this.props.fetchMe()
            }

            render() {
                let { isFetching, me } = this.props
                if (isFetching) {
                    return (
                        <CircularProgress size={80} style={circularProgress} />
                    )
                }
                if (!isFetching && me.access.indexOf(access) !== -1) {
                    return <Component {...this.props} />
                }
                return <Redirect to="/" />
            }
        }

        return Access
    }

export default canReachAccess
