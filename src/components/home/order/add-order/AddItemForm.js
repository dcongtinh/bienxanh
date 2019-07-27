import React from 'react'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import TextField from 'components/Input/TextField'
import IconButton from '@material-ui/core/IconButton'
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle'
import ConfirmDialog from 'components/ConfirmDialog'
import Select from 'components/Input/Select'
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
    }
})
class AddItemForm extends React.Component {
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
    render() {
        let { openConfirm } = this.state
        let {
            classes,
            array,
            handleChange,
            handleSelectChange,
            handleBlur,
            values,
            errors,
            touched,
            options,
            states,
            isUpdateOrder,
            idOrder,
            warehouse,
            items,
            buyerName
        } = this.props
        return (
            <>
                {array.map((item, index) => {
                    return (
                        <Grid
                            key={index}
                            item
                            container
                            spacing={2}
                            className={classes.groupOrder}>
                            <div className={classes.legend}>{`Đơn hàng ${index +
                                1}`}</div>
                            {isUpdateOrder && (
                                <IconButton
                                    className={classes.removeCircleIcon}
                                    onClick={() => this.handleOpen(index)}>
                                    <RemoveCircleIcon />
                                </IconButton>
                            )}

                            <Grid item xs={12}>
                                <Select
                                    name={`itemName${index}`}
                                    value={
                                        states[`itemName${index}`] ||
                                        options[0].value
                                    }
                                    label="Nhập tên hàng"
                                    onChange={handleSelectChange}
                                    options={options}
                                />
                            </Grid>
                            {/* <Grid item xs={12} sm={4}>
                                <TextField
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values[`batchNo${index}`]}
                                    label="Số lô"
                                    name={`batchNo${index}`}
                                    error={
                                        errors[`batchNo${index}`] &&
                                        touched[`batchNo${index}`]
                                    }
                                    message={errors[`batchNo${index}`]}
                                />
                            </Grid> */}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values[`itemQuantity${index}`]}
                                    label="Số lượng"
                                    name={`itemQuantity${index}`}
                                    type="number"
                                    min="1"
                                    error={
                                        errors[`itemQuantity${index}`] &&
                                        touched[`itemQuantity${index}`]
                                    }
                                    message={errors[`itemQuantity${index}`]}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values[`itemPrice${index}`]}
                                    label="Đơn giá"
                                    name={`itemPrice${index}`}
                                    type="number"
                                    pattern="\d+"
                                    error={
                                        errors[`itemPrice${index}`] &&
                                        touched[`itemPrice${index}`]
                                    }
                                    message={errors[`itemPrice${index}`]}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values[`itemNote${index}`]}
                                    label="Ghi chú"
                                    name={`itemNote${index}`}
                                    error={
                                        errors[`itemNote${index}`] &&
                                        touched[`itemNote${index}`]
                                    }
                                    message={errors[`itemNote${index}`]}
                                    norequired
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
                        items.splice(this.state.indexItem, 1)
                        this.props.updateOrder({
                            idOrder,
                            data: { warehouse, buyerName, items }
                        })
                        this.handleClose()
                    }}
                />
                <button>AddMore</button>
            </>
        )
    }
}
export default withStyles(styles)(AddItemForm)
