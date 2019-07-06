import React from 'react'
import clsx from 'clsx'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'
import MenuIcon from '@material-ui/icons/Menu'
import NotificationsIcon from '@material-ui/icons/Notifications'
import { inject, observer } from 'mobx-react'

const drawerWidth = 240

const styles = theme => ({
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
    render() {
        let { classes } = this.props
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
                        Dashboard
                    </Typography>
                    <IconButton color="inherit">
                        <Badge badgeContent={4} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>
        )
    }
}

export default withStyles(styles)(Header)
