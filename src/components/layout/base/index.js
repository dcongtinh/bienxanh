import React, { Component } from 'react'
import classNames from 'classnames'
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import { withStyles, withWidth, Drawer } from '@material-ui/core'
import { Sidebar, Topbar } from '../components'
import styles from './styles'
import { inject, observer } from 'mobx-react'

@inject(({ auth }) => ({
    fetchMe: () => auth.fetchMe(),
    isAuthenticated: auth.isAuthenticated
}))
@observer
class Dashboard extends Component {
    constructor(props) {
        super(props)

        const isMobile = ['xs', 'sm', 'md'].includes(props.width)

        this.state = {
            isOpen: !isMobile,
            title: 'Trang  chủ'
        }
    }

    handleClose = () => {
        this.setState({ isOpen: false })
    }

    handleToggleOpen = () => {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }))
    }

    setTitleTopbar = title => {
        this.setState({ title })
    }
    componentDidMount() {
        this.props.fetchMe()
    }
    render() {
        const { classes, width, children, isAuthenticated } = this.props
        const { isOpen, title } = this.state

        const isMobile = ['xs', 'sm', 'md'].includes(width)
        const shiftTopbar = isOpen && !isMobile && isAuthenticated
        const shiftContent = isOpen && !isMobile && isAuthenticated
        return (
            <>
                <Topbar
                    className={classNames(classes.topbar, {
                        [classes.topbarShift]: shiftTopbar
                    })}
                    isSidebarOpen={isOpen}
                    onToggleSidebar={this.handleToggleOpen}
                    title={title}
                />
                {isAuthenticated && (
                    <Drawer
                        anchor="left"
                        classes={{ paper: classes.drawerPaper }}
                        onClose={this.handleClose}
                        open={isOpen}
                        variant={isMobile ? 'temporary' : 'persistent'}>
                        <Sidebar
                            className={classes.sidebar}
                            setTitleTopbar={this.setTitleTopbar}
                        />
                    </Drawer>
                )}

                <main
                    className={classNames(classes.content, {
                        [classes.contentShift]: shiftContent
                    })}>
                    {children}
                    {/* <Footer /> */}
                </main>
            </>
        )
    }
}

Dashboard.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    title: PropTypes.string,
    width: PropTypes.string.isRequired
}

export default compose(
    withStyles(styles),
    withWidth()
)(Dashboard)
