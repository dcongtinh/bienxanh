import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Typography from '@material-ui/core/Typography'

import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
    container: {
        overflowY: 'hidden',
        maxHeight: '80%'
    },
    dialogActions: {
        padding: 24
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
                <DialogTitle onClose={onHide} />
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Typography variant="h4">{title}</Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions className={classes.dialogActions}>
                    <Button color="primary" variant="outlined" onClick={onHide}>
                        {cancelLabel}
                    </Button>
                    <Button
                        color="primary"
                        variant="contained"
                        autoFocus
                        onClick={onOK}>
                        {okLabel}
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}
export default withStyles(styles)(ConfirmDialog)
