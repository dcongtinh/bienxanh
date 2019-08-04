import React from 'react'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import TextField from 'components/Input/TextField'
import { Typography } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import ConfirmDialog from 'components/ConfirmDialog'
import Checkbox from '@material-ui/core/Checkbox'
import NumberFormat from 'react-number-format'
import { InlineDatePicker } from 'material-ui-pickers'

const styles = theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white
        }
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
    },
    checkbox: {
        display: 'flex',
        alignItems: 'center'
    },
    label: {
        cursor: 'pointer'
    }
})

const NumberFormatCustom = props => {
    const { inputRef, onChange, ...other } = props
    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={values => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value
                    }
                })
            }}
            thousandSeparator
        />
    )
}

class ItemPriceForm extends React.Component {
    state = {
        indexItem: null,
        openConfirm: false,
        openChooseWarehouse: false,
        area: 0,
        index: 0
    }
    handleOpen = indexItem => {
        this.setState({ openConfirm: true, indexItem })
    }
    handleClose = () => {
        this.setState({ openConfirm: false, openChooseWarehouse: false })
    }
    handleAdd = () => {
        let count = this.props.array.length + 1
        this.props.handleChangeCount(count)
    }
    handleSub = () => {
        let count = Math.max(this.props.array.length - 1, 1)
        this.props.handleChangeCount(count)
    }
    handleChangeOption = data => {
        let { states } = this.props
        let { index, area } = this.state
        if (!states.datas[index]) {
            states.datas[index] = []
            states.datas[index][0] = []
            states.datas[index][1] = []
            states.datas[index][2] = []
        }

        states.datas[index][area] = data || []

        this.props.handleSelect(states.datas)
    }
    render() {
        let { openConfirm, openChooseWarehouse, area } = this.state

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
            itemName,
            options
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
                            <div className={classes.legend}>{`Đơn giá ${index +
                                1}`}</div>
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
                            <Grid item xs={12} sm={8}>
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
                                    InputProps={{
                                        inputComponent: NumberFormatCustom
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <InlineDatePicker
                                    name={`dateApply${index}`}
                                    variant="outlined"
                                    format="DD/MM/YYYY"
                                    label="Ngày áp dụng"
                                    value={states[`dateApply${index}`]}
                                    onChange={date =>
                                        this.props.handleChangeDate(
                                            `dateApply${index}`,
                                            date
                                        )
                                    }
                                    fullWidth
                                />
                            </Grid>
                            {options.map((__item__, index1) => {
                                let label
                                if (index1 === 0) label = 'Miền Bắc'
                                if (index1 === 1) label = 'Miền Trung'
                                if (index1 === 2) label = 'Miền Nam'
                                let count = states.datas[index]
                                    ? states.datas[index][index1].length
                                    : 0
                                let total = __item__.length
                                return (
                                    <Grid item xs={12} sm={4} key={index1}>
                                        <div className={classes.checkbox}>
                                            <Checkbox
                                                color="primary"
                                                checked={Boolean(
                                                    count && count === total
                                                )}
                                                value={false}
                                                onClick={() => {
                                                    let data
                                                    if (
                                                        count &&
                                                        count === total
                                                    )
                                                        data = []
                                                    else data = options[index1]
                                                    states.datas[index][
                                                        index1
                                                    ] = data
                                                    this.props.handleSelect(
                                                        states.datas
                                                    )
                                                }}
                                            />
                                            <Typography
                                                className={classes.label}
                                                onClick={() => {
                                                    this.setState({
                                                        openChooseWarehouse: true,
                                                        index,
                                                        area: index1
                                                    })
                                                }}>{`${label} (${count}/${total})`}</Typography>
                                        </div>
                                    </Grid>
                                )
                            })}
                        </Grid>
                    )
                })}
                <ConfirmDialog
                    open={openConfirm}
                    title={
                        prices && prices.length === 1
                            ? `Bạn có chắc muốn xoá hàng?`
                            : `Bạn có chắc muốn xoá Đơn giá ${this.state
                                  .indexItem + 1}?`
                    }
                    cancelLabel="Huỷ"
                    okLabel="Xoá"
                    onHide={this.handleClose}
                    onOK={() => {
                        if (isUpdateItem && prices && prices.length === 1) {
                            let itemsListId = []
                            itemsListId.push(idItem)
                            this.props.deleteItems({ itemsListId })
                            this.props.history.push('/dashboard/items')
                        } else {
                            prices.splice(this.state.indexItem, 1)

                            this.props.updateItem({
                                idItem,
                                itemNameCode,
                                itemName,
                                itemPrices: prices
                            })
                        }
                        this.handleClose()
                    }}
                />
                <ConfirmDialog
                    open={openChooseWarehouse}
                    title={`Chọn kho`}
                    cancelLabel="Đóng"
                    handleChangeOption={this.handleChangeOption}
                    onHide={this.handleClose}
                    select={{
                        value: states.datas[this.state.index]
                            ? states.datas[this.state.index][area]
                            : [],
                        index: this.state.index,
                        area,
                        options: options[area],
                        multiple: true,
                        placeholder: 'Search and select Warehouse'
                    }}
                />
                <Fab
                    color="primary"
                    aria-label="Add"
                    className={classes.fab}
                    onClick={this.handleAdd}>
                    <AddIcon />
                </Fab>
            </>
        )
    }
}
export default withStyles(styles)(ItemPriceForm)
