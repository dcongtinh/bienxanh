import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
    container: {
        overflowY: 'hidden',
        maxHeight: '80%',
        width: '60%'
    }
})

class ConfirmDialog extends Component {
    render() {
        let {
            open,
            onHide,
            onOK,
            title,
            cancelLabel,
            okLabel,
            classes
        } = this.props
        return (
            <Dialog
                open={open}
                onClose={onHide}
                classes={{
                    paper: classes.container
                }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle onClose={onHide}>Title</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {title}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={onHide}>
                        {cancelLabel}
                    </Button>
                    <Button color="primary" autoFocus onClick={onOK}>
                        {okLabel}
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}
export default withStyles(styles)(ConfirmDialog)
