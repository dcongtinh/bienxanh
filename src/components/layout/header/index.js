import React from 'react'
import clsx from 'clsx'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import PersonIcon from '@material-ui/icons/Person'
import Divider from '@material-ui/core/Divider'
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

const drawerWidth = 240

const styles = theme => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white
            }
        }
    },
    link: {
        textDecoration: 'unset',
        color: theme.palette.common.black
    },

    toolbar: {
        paddingRight: 24 // keep right padding when drawer closed
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    menuButton: {
        marginRight: 36
    },
    menuButtonHidden: {
        display: 'none'
    },
    title: {
        flexGrow: 1
    }
})

@inject(({ auth }) => ({
    me: auth.me,
    logout: () => auth.logout(),
    isAuthenticated: auth.isAuthenticated
}))
@observer
class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            anchorEl: null
        }
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
    render() {
        let { classes, title, me } = this.props
        let { anchorEl } = this.state
        if (!this.props.isAuthenticated) return null
        return (
            <AppBar
                position="absolute"
                className={clsx(
                    classes.appBar,
                    this.props.open && classes.appBarShift
                )}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="Open drawer"
                        onClick={this.props.toogleDrawer}
                        className={clsx(
                            classes.menuButton,
                            this.props.open && classes.menuButtonHidden
                        )}>
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        className={classes.title}>
                        {title}
                    </Typography>
                    <IconButton
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
                        <Link
                            to={`/dashboard/profile/${me.username}`}
                            className={classes.link}
                            onClick={this.handleClose}>
                            <MenuItem className={classes.root}>
                                <ListItemIcon>
                                    <PersonIcon />
                                </ListItemIcon>
                                <ListItemText primary="Hồ sơ" />
                            </MenuItem>
                        </Link>
                        <Divider />
                        <MenuItem
                            className={classes.root}
                            onClick={this.logout}>
                            <ListItemIcon>
                                <ExitToAppIcon />
                            </ListItemIcon>
                            <ListItemText primary="Đăng xuất" />
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
        )
    }
}

export default withStyles(styles)(Header)
