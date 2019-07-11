import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

// Externals
import classNames from 'classnames'
import PropTypes from 'prop-types'

// Material helpers
import { withStyles } from '@material-ui/core'

// Material components
import {
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography
} from '@material-ui/core'

// Component styles
import styles from './styles'
import listItem from './listItem'

class Sidebar extends Component {
    render() {
        const { classes, className } = this.props

        const rootClassName = classNames(classes.root, className)

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
                        return (
                            <ListItem
                                key={index}
                                activeClassName={classes.activeListItem}
                                className={classes.listItem}
                                component={NavLink}
                                to={item.link}
                                onClick={() =>
                                    this.props.setTitleTopbar(item.title)
                                }>
                                <ListItemIcon className={classes.listItemIcon}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    classes={{ primary: classes.listItemText }}
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
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Sidebar)
