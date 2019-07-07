import React from 'react'
import clsx from 'clsx'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import DashboardIcon from '@material-ui/icons/Dashboard'
import ListIcon from '@material-ui/icons/List'
import BarChartIcon from '@material-ui/icons/BarChart'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import NotesIcon from '@material-ui/icons/Notes'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import listItem from './listItem'
const drawerWidth = 240

const styles = theme => ({
    toolbar: {
        paddingRight: 24 // keep right padding when drawer closed
    },
    link: {
        textDecoration: 'unset',
        color: theme.palette.common.black
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9)
        }
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column'
    }
})

@inject(({ auth }) => ({
    isAuthenticated: auth.isAuthenticated
}))
@observer
class Sidebar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedIndex: 0
        }
    }
    updateSelected = selectedIndex => {
        this.setState({ selectedIndex })
    }
    render() {
        let { selectedIndex } = this.state
        let { classes, open, toogleDrawer, isAuthenticated } = this.props
        if (!isAuthenticated) return null
        return (
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(
                        classes.drawerPaper,
                        !open && classes.drawerPaperClose
                    )
                }}
                open={open}>
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={toogleDrawer}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {listItem.map((item, index) => {
                        return (
                            <Link
                                key={index}
                                to={item.link}
                                className={classes.link}
                                onClick={() => {
                                    this.updateSelected(index)
                                    this.props.setTitleHeader(item.title)
                                }}>
                                <ListItem
                                    button
                                    selected={selectedIndex === index}>
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.title} />
                                </ListItem>
                            </Link>
                        )
                    })}
                </List>
                <Divider />
            </Drawer>
        )
    }
}

export default withStyles(styles)(Sidebar)
