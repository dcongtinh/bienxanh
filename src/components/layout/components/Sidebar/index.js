import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import {
    withStyles,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
} from '@material-ui/core'
import styles from './styles'
import listItem from './listItem'
import { inject, observer } from 'mobx-react'

@inject(({ auth }) => ({
    fetchMe: () => auth.fetchMe(),
    me: JSON.parse(JSON.stringify(auth.me)),
    logout: () => auth.logout(),
    isAuthenticated: auth.isAuthenticated,
}))
@observer
class Sidebar extends Component {
    componentDidMount = () => {
        this.props.fetchMe()
    }

    render() {
        const { classes, className, me } = this.props

        const rootClassName = classNames(classes.root, className)
        if (!this.props.isAuthenticated) return null

        return (
            <nav className={rootClassName}>
                <div className={classes.profile}>
                    <Typography className={classes.nameText} variant="h4">
                        Bien Xanh
                    </Typography>
                </div>
                <Divider className={classes.profileDivider} />
                <List component="div" disablePadding>
                    {listItem.map((item, index) => {
                        if (me.access.indexOf(item.access) === -1) return false
                        return (
                            <ListItem
                                key={index}
                                activeClassName={classes.activeListItem}
                                className={classes.listItem}
                                component={NavLink}
                                to={item.link}
                                onClick={() =>
                                    this.props.setTitleTopbar(item.title)
                                }
                            >
                                <ListItemIcon className={classes.listItemIcon}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    classes={{
                                        primary: classes.listItemText,
                                    }}
                                    primary={item.title}
                                />
                            </ListItem>
                        )
                    })}
                </List>
            </nav>
        )
    }
}

Sidebar.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Sidebar)
