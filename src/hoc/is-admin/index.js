import React from 'react'
import { inject, observer } from 'mobx-react'
import { Redirect } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress'

const createIsSiteAdmin = ({ siteAdmin = true }) => Component => {
    const circularProgress = {
        position: 'absolute',
        top: '45%',
        left: '50%'
    }

    @inject(({ auth }) => ({
        fetchMe: () => auth.fetchMe(),
        me: JSON.parse(JSON.stringify(auth.me)),
        isFetching: auth.isFetchingMe,
        hasFetched: auth.hasFetched
    }))
    @observer
    class SiteAdmin extends React.Component {
        async componentDidMount() {
            if (!this.props.hasFetched) this.props.fetchMe()
        }

        render() {
            let { isFetching, me } = this.props
            if (isFetching) {
                return <CircularProgress size={80} style={circularProgress} />
            }
            if (siteAdmin && !isFetching && me.siteAdmin) {
                return <Component {...this.props} />
            }
            return <Redirect to="/" />
        }
    }

    return SiteAdmin
}

export default createIsSiteAdmin
