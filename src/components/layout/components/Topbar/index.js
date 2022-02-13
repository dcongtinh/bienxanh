import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'

// Externals
import classNames from 'classnames'
import compose from 'recompose/compose'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core'
import {
    IconButton,
    Toolbar,
    Typography,
    Menu,
    MenuItem,
    Divider,
    ListItemIcon,
    ListItemText,
} from '@material-ui/core'
import { NavLink } from 'react-router-dom'
import {
    Menu as MenuIcon,
    Close as CloseIcon,
    AccountCircle as AccountCircleIcon,
    ExitToApp as ExitToAppIcon,
    Person as PersonIcon,
} from '@material-ui/icons'
import { inject, observer } from 'mobx-react'
import styles from './styles'

@inject(({ auth }) => ({
    fetchMe: () => auth.fetchMe(),
    me: JSON.parse(JSON.stringify(auth.me)),
    logout: () => auth.logout(),
    isAuthenticated: auth.isAuthenticated,
}))
@observer
class Topbar extends Component {
    state = {
        anchorEl: null,
    }
    handleClose = () => {
        this.setState({ anchorEl: null })
    }
    handleClick = (e) => {
        this.setState({ anchorEl: e.currentTarget })
    }
    logout = () => {
        this.handleClose()
        this.props.logout()
    }
    componentDidMount = () => {
        this.props.fetchMe()
    }

    render() {
        const {
            classes,
            className,
            title,
            isSidebarOpen,
            onToggleSidebar,
            me,
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
                            variant="text"
                        >
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
                            onClick={this.handleClick}
                        >
                            <AccountCircleIcon />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={this.handleClose}
                            disableAutoFocusItem
                        >
                            <MenuItem
                                component={NavLink}
                                to={`/dashboard/profile/${me.username}`}
                                onClick={this.handleClose}
                            >
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
    title: PropTypes.string,
}

Topbar.defaultProps = {
    onToggleSidebar: () => {},
}

export default compose(withRouter, withStyles(styles))(Topbar)
