import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Typography from '@material-ui/core/Typography'
import FormControl from '@material-ui/core/FormControl'
import Select from 'react-select'
// import makeAnimated from 'react-select/lib/animated'

import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
    container: {
        overflowY: 'hidden',
        maxHeight: '80%',
        width: '60%'
    },
    dialogActions: {
        padding: 24
    }
})

class ConfirmDialog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            datas: [],
            inputError: '',
            focus: false,
            access: 0
        }
    }

    handleChangeOption = data => {
        this.props.handleChangeOption(data)
    }

    render() {
        let {
            open,
            onHide,
            onOK,
            title,
            cancelLabel,
            okLabel,
            select,
            classes
        } = this.props
        let { focus } = this.state
        let height = !focus ? 'auto' : 360
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
                        <Typography variant="h4" gutterBottom>
                            {title}
                        </Typography>
                        {select && (
                            <FormControl fullWidth style={{ height }}>
                                <Select
                                    isMulti={select.multiple}
                                    value={select.value}
                                    onChange={this.handleChangeOption}
                                    options={select.options}
                                    className={'basic-multi-select'}
                                    classNamePrefix={'select'}
                                    closeMenuOnSelect={false}
                                    // components={makeAnimated()}
                                    placeholder={select.placeholder}
                                    styles={{
                                        multiValue: base => ({
                                            ...base,
                                            borderRadius: 16
                                        }),
                                        option: base => ({
                                            ...base,
                                            maxWidth: '100%',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap'
                                        })
                                    }}
                                    onMenuOpen={() =>
                                        this.setState({ focus: true })
                                    }
                                    onMenuClose={() =>
                                        this.setState({ focus: false })
                                    }
                                />
                            </FormControl>
                        )}
                    </DialogContentText>
                </DialogContent>
                <DialogActions className={classes.dialogActions}>
                    {cancelLabel && (
                        <Button
                            color="primary"
                            variant="outlined"
                            onClick={onHide}>
                            {cancelLabel}
                        </Button>
                    )}
                    {okLabel && (
                        <Button
                            color="primary"
                            variant="contained"
                            autoFocus
                            onClick={onOK}>
                            {okLabel}
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
        )
    }
}
export default withStyles(styles)(ConfirmDialog)
