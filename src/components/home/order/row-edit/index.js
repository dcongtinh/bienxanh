import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import EditIcon from '@material-ui/icons/Edit'
import IconButton from '@material-ui/core/IconButton'
import Checkbox from '@material-ui/core/Checkbox'

const styles = theme => ({
    editOption: {
        display: 'flex'
    }
})

class RowEdit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checked: props.checked
        }
    }

    render() {
        let { checked } = this.state
        let { classes, idOrder, noedit } = this.props
        return (
            <div className={classes.editOption}>
                {!noedit && (
                    <IconButton
                        onClick={() => {
                            this.props.history.push(
                                `/dashboard/orders/${idOrder}`
                            )
                        }}>
                        <EditIcon />
                    </IconButton>
                )}
                <Checkbox
                    checked={Boolean(checked)}
                    onChange={() => {
                        this.props.updateOrder({
                            idOrder,
                            data: {
                                payStatus: !checked
                            }
                        })
                        this.setState({ checked: !checked })
                    }}
                />
            </div>
        )
    }
}

export default withStyles(styles)(RowEdit)
