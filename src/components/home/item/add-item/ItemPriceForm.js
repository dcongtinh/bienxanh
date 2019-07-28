import React from 'react'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import TextField from 'components/Input/TextField'
import IconButton from '@material-ui/core/IconButton'
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import ConfirmDialog from 'components/ConfirmDialog'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'

const styles = theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white
        }
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3)
    },
    submit: {
        margin: theme.spacing(2, 0)
    },
    circularProgress: {
        position: 'absolute',
        width: '24px !important',
        height: '24px !important'
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    formControl: {
        minWidth: 120,
        width: '100%'
    },
    selectEmpty: {
        marginTop: theme.spacing(2)
    },
    groupOrder: {
        position: 'relative',
        margin: theme.spacing(1),
        border: '1px solid ' + theme.palette.border,
        paddingTop: theme.spacing(2) + 'px !important'
    },
    legend: {
        position: 'absolute',
        backgroundColor: 'white',
        top: -8,
        padding: '0 4px'
    },
    removeCircleIcon: {
        position: 'absolute',
        top: -21,
        right: -21,
        color: theme.palette.danger.dark
    },
    fab: {
        marginLeft: theme.spacing(1)
    }
})
class ItemPriceForm extends React.Component {
    state = {
        indexItem: null,
        openConfirm: false
    }
    handleOpen = indexItem => {
        this.setState({ openConfirm: true, indexItem })
    }
    handleClose = () => {
        this.setState({ openConfirm: false })
    }
    handleAdd = () => {
        let count = Math.min(this.props.array.length + 1, 10)
        this.props.handleChangeCount(count)
    }
    handleSub = () => {
        let count = Math.max(this.props.array.length - 1, 1)
        this.props.handleChangeCount(count)
    }
    render() {
        let { openConfirm } = this.state
        let {
            classes,
            array,
            handleChange,
            handleBlur,
            values,
            errors,
            touched,
            states,
            isUpdateItem,
            idItem,
            prices,
            itemNameCode,
            itemName
        } = this.props
        array.forEach((item, index) => {
            if (states[`areaPrice${index}`] === undefined) {
                states[`areaPrice${index}`] = {
                    0: true,
                    1: true,
                    2: true
                }
            }
        })
        return (
            <>
                {array.map((item, index) => {
                    let checked0 = states[`areaPrice${index}`][0],
                        checked1 = states[`areaPrice${index}`][1],
                        checked2 = states[`areaPrice${index}`][2]
                    return (
                        <Grid
                            key={index}
                            item
                            container
                            spacing={2}
                            className={classes.groupOrder}>
                            {/* <div className={classes.legend}>{`Đơn hàng ${index +
                                1}`}</div> */}
                            {(isUpdateItem || array.length > 1) && (
                                <IconButton
                                    className={classes.removeCircleIcon}
                                    onClick={() => {
                                        if (isUpdateItem) this.handleOpen(index)
                                        else this.handleSub()
                                    }}>
                                    <RemoveCircleIcon />
                                </IconButton>
                            )}
                            <Grid item xs={12}>
                                <TextField
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values[`itemPrice${index}`]}
                                    label="Đơn giá"
                                    name={`itemPrice${index}`}
                                    error={
                                        errors[`itemPrice${index}`] &&
                                        touched[`itemPrice${index}`]
                                    }
                                    message={errors[`itemPrice${index}`]}
                                    type="number"
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            color="primary"
                                            checked={checked0}
                                            value={checked0}
                                            onChange={e => {
                                                states[`areaPrice${index}`][0] =
                                                    e.target.checked
                                                this.props.handleCheckbox(
                                                    `areaPrice${index}`,
                                                    states[`areaPrice${index}`]
                                                )
                                            }}
                                        />
                                    }
                                    label="Miền Bắc"
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            color="primary"
                                            checked={checked1}
                                            value={checked1}
                                            onChange={e => {
                                                states[`areaPrice${index}`][1] =
                                                    e.target.checked
                                                this.props.handleCheckbox(
                                                    `areaPrice${index}`,
                                                    states[`areaPrice${index}`]
                                                )
                                            }}
                                        />
                                    }
                                    label="Miền Trung"
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            color="primary"
                                            checked={checked2}
                                            value={checked2}
                                            onChange={e => {
                                                states[`areaPrice${index}`][2] =
                                                    e.target.checked
                                                this.props.handleCheckbox(
                                                    `areaPrice${index}`,
                                                    states[`areaPrice${index}`]
                                                )
                                            }}
                                        />
                                    }
                                    label="Miền Nam"
                                />
                            </Grid>
                        </Grid>
                    )
                })}
                <ConfirmDialog
                    open={openConfirm}
                    title={`Bạn có chắc muốn xoá Đơn hàng ${this.state
                        .indexItem + 1}?`}
                    cancelLabel="Huỷ"
                    okLabel="Xoá"
                    onHide={this.handleClose}
                    onOK={() => {
                        prices.splice(this.state.indexItem, 1)

                        this.props.updateItem({
                            idItem,
                            itemNameCode,
                            itemName,
                            itemPrices: prices
                        })
                        this.handleClose()
                    }}
                />
                <Fab
                    color="primary"
                    aria-label="Add"
                    className={classes.fab}
                    onClick={this.handleAdd}>
                    <AddIcon />
                </Fab>
                {/* <button onClick={this.handleAdd}>AddMore</button> */}
            </>
        )
    }
}
export default withStyles(styles)(ItemPriceForm)
