import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'

// Externals
import classNames from 'classnames'
import compose from 'recompose/compose'
import PropTypes from 'prop-types'

// Material helpers
import { withStyles } from '@material-ui/core'
import { inject, observer } from 'mobx-react'
// Material components
import { IconButton, Toolbar, Typography } from '@material-ui/core'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import PersonIcon from '@material-ui/icons/Person'
import Divider from '@material-ui/core/Divider'
import { NavLink } from 'react-router-dom'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

// Material icons
import { Menu as MenuIcon, Close as CloseIcon } from '@material-ui/icons'

// Component styles
import styles from './styles'

@inject(({ auth }) => ({
    me: auth.me,
    logout: () => auth.logout(),
    isAuthenticated: auth.isAuthenticated
}))
@observer
class Topbar extends Component {
    signal = true

    state = {
        anchorEl: null
    }

    handleClose = () => {
        this.setState({ anchorEl: null })
    }
    handleClick = e => {
        this.setState({ anchorEl: e.currentTarget })
    }
    logout = () => {
        this.handleClose()
        this.props.logout()
    }

    componentDidMount() {
        this.signal = true
    }

    componentWillUnmount() {
        this.signal = false
    }

    render() {
        const {
            classes,
            className,
            title,
            isSidebarOpen,
            onToggleSidebar,
            me
        } = this.props
        const { anchorEl } = this.state

        const rootClassName = classNames(classes.root, className)
        if (!this.props.isAuthenticated) return null
        return (
            <Fragment>
                <div className={rootClassName}>
                    <Toolbar className={classes.toolbar}>
                        <IconButton
                            className={classes.menuButton}
                            onClick={onToggleSidebar}
                            variant="text">
                            {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
                        </IconButton>
                        <Typography className={classes.title} variant="h4">
                            {title}
                        </Typography>

                        <IconButton
                            className={classes.profileButton}
                            elevation={0}
                            color="inherit"
                            aria-owns={anchorEl ? 'simple-menu' : null}
                            aria-haspopup="true"
                            onClick={this.handleClick}>
                            <AccountCircleIcon />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={this.handleClose}
                            disableAutoFocusItem>
                            <MenuItem
                                component={NavLink}
                                to={`/dashboard/profile/${me.username}`}
                                onClick={this.handleClose}>
                                <ListItemIcon>
                                    <PersonIcon />
                                </ListItemIcon>
                                <ListItemText primary="Hồ sơ" />
                            </MenuItem>
                            <Divider />
                            <MenuItem onClick={this.logout}>
                                <ListItemIcon>
                                    <ExitToAppIcon />
                                </ListItemIcon>
                                <ListItemText primary="Đăng xuất" />
                            </MenuItem>
                        </Menu>
                    </Toolbar>
                </div>
            </Fragment>
        )
    }
}

Topbar.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    isSidebarOpen: PropTypes.bool,
    onToggleSidebar: PropTypes.func,
    title: PropTypes.string
}

Topbar.defaultProps = {
    onToggleSidebar: () => {}
}

export default compose(
    withRouter,
    withStyles(styles)
)(Topbar)
