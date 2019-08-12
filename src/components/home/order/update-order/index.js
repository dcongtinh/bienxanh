import React from 'react'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import TextFieldCustomized from 'components/Input/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import SaveIcon from '@material-ui/icons/Save'
import CircularProgress from '@material-ui/core/CircularProgress'
import Select from 'react-select'
import numeral from 'numeral'
import { DatePicker } from '@material-ui/pickers'
import NumberFormat from 'react-number-format'
import OrdersTable from 'components/home/order/add-order/OrdersTable'
import moment from 'moment'

const NumberFormatCustom = props => {
    const { inputRef, onChange, ...other } = props
    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={values => {
                onChange({
                    target: {
                        value: values.value
                    }
                })
            }}
            thousandSeparator
        />
    )
}

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
        marginTop: theme.spacing(3),
        position: 'relative'
    },
    iconSubmit: {
        marginRight: theme.spacing()
    },
    circularProgress: {
        position: 'absolute',
        width: '24px !important',
        height: '24px !important'
    },
    buttonSubmit: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: theme.spacing(2)
    }
})

class UpdateOrder extends React.Component {
    constructor(props) {
        super(props)
        let { buyerName } = props.order
        let lastIndex = buyerName.lastIndexOf('/') + 1
        buyerName = buyerName.substring(lastIndex, buyerName.length)
        this.state = {
            buyerCode: props.order.warehouse.buyerCode,
            warehouse: props.order.warehouse._id,
            date: props.order.date || new Date(),
            itemNote: props.order.itemNote || '',
            buyerName,
            data: props.order.orders || []
        }
    }
    handleDateChange = date => {
        this.setState({ date })
    }
    handleChange = data => {
        this.setState({ data })
    }
    handleChangeText = e => {
        this.setState({ [e.target.name]: e.target.value })
    }
    render() {
        let { buyerCode, warehouse, buyerName, itemNote, data } = this.state
        let { classes, isRequesting, wareHouses, items, me, order } = this.props
        let idOrder = this.props.match.params.idOrder
        let optionsWarehouse = [],
            warehouseName = {}
        wareHouses.forEach(warehouse => {
            warehouseName[warehouse._id] = `${warehouse.warehouseName} (${
                warehouse.warehouse
            })`
            optionsWarehouse.push({
                value: warehouse._id,
                label: `${warehouse.warehouseName} (${warehouse.warehouse})`
            })
        })
        let optionsItem = [],
            itemName = {}
        items.forEach(item => {
            itemName[item._id] = item.itemName
            optionsItem.push({
                value: item._id,
                label: item.itemName
            })
        })

        let columns = [
            {
                title: 'Hàng hoá',
                field: 'itemName',
                headerStyle: {
                    marginBottom: 4
                },
                render: rowData => {
                    return <div>{itemName[rowData.itemName]}</div>
                },
                editComponent: props => {
                    let value
                    if (props.value)
                        value = {
                            value: props.value,
                            label: itemName[props.value]
                        }
                    return (
                        <Select
                            name="itemName"
                            value={value}
                            onChange={data => {
                                props.onChange(data.value)
                            }}
                            options={optionsItem}
                            className={'basic-multi-select'}
                            classNamePrefix={'select'}
                            placeholder="Chọn hàng hoá"
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
                        />
                    )
                }
            },
            {
                title: 'Số lượng',
                field: 'itemQuantity',
                render: rowData => {
                    return (
                        <div>
                            {rowData.itemQuantity
                                ? numeral(rowData.itemQuantity).format(
                                      '(0,0.[0000])'
                                  )
                                : '-'}
                        </div>
                    )
                },
                editComponent: props => (
                    <TextField
                        style={{ width: 70 }}
                        onChange={e => props.onChange(e.target.value)}
                        value={props.value}
                        name="itemQuantity"
                        InputProps={{
                            inputComponent: NumberFormatCustom
                        }}
                    />
                )
            }
        ]
        data.forEach((_order, index) => {
            delete _order._id
            let idItem = _order.itemName
            let idWarehouse = this.state.warehouse || wareHouses[0]._id
            let item = items.filter(item => {
                return item._id === idItem
            })
            let prices = []
            item = item[0]
            item.itemPrices.forEach(itemPrice => {
                let match = itemPrice[idWarehouse] ? true : false
                if (match)
                    prices.push({
                        dateApply: itemPrice.dateApply,
                        itemPrice: itemPrice[idWarehouse]
                    })
            })
            prices.sort((a, b) => {
                return (
                    new Date(b.dateApply).getTime() -
                    new Date(a.dateApply).getTime()
                )
            })
            let date = moment(this.state.date).format('YYYY/MM/DD')
            let price = 0
            for (let i in prices) {
                let item = prices[i]
                let dateApply = moment(item.dateApply).format('YYYY/MM/DD')
                if (date >= dateApply) {
                    price = item.itemPrice
                    break
                }
            }
            _order.itemPrice = price
        })

        if (!warehouse) warehouse = optionsWarehouse[0]
        else {
            warehouse = {
                value: warehouse,
                label: warehouseName[warehouse]
            }
        }
        return (
            <div>
                <Container component="main" maxWidth="sm">
                    <CssBaseline />
                    <div className={classes.paper}>
                        <div className={classes.form}>
                            <Grid item container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextFieldCustomized
                                        onChange={this.handleChangeText}
                                        value={buyerName}
                                        label="Họ tên"
                                        name="buyerName"
                                        norequired={true}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    {`26296/WH${buyerCode}/`}
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <DatePicker
                                        autoOk
                                        inputVariant="outlined"
                                        name="date"
                                        variant="inline"
                                        format="DD/MM/YYYY"
                                        label="Ngày nhập"
                                        value={this.state.date}
                                        onChange={this.handleDateChange}
                                        fullWidth
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Select
                                        name="warehouse"
                                        value={warehouse}
                                        label="Nhập kho"
                                        onChange={data => {
                                            this.props.wareHouses.forEach(
                                                wareHouse => {
                                                    if (
                                                        wareHouse._id ===
                                                        data.value
                                                    ) {
                                                        this.setState({
                                                            buyerCode:
                                                                wareHouse.buyerCode,
                                                            warehouse:
                                                                data.value
                                                        })
                                                    }
                                                }
                                            )
                                        }}
                                        options={optionsWarehouse}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextFieldCustomized
                                        onChange={this.handleChangeText}
                                        value={itemNote}
                                        label="Ghi chú"
                                        name={'itemNote'}
                                        norequired={true}
                                        style={{ zIndex: 0 }}
                                    />
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </Container>
                <OrdersTable
                    title={`Hoá đơn số ${order.group}`}
                    data={data}
                    columns={columns}
                    handleChange={this.handleChange}
                />
                <Grid item container spacing={2}>
                    <Grid item xs={12} className={classes.buttonSubmit}>
                        <Button
                            onClick={() => {
                                let warehouse =
                                    this.state.warehouse ||
                                    optionsWarehouse[0].value
                                let buyerName = `26296/WH${buyerCode}/${
                                    this.state.buyerName
                                }`
                                this.props.updateOrder({
                                    idOrder,
                                    data: {
                                        warehouse,
                                        buyerName,
                                        orders: data,
                                        owner: me._id,
                                        itemNote,
                                        date: this.state.date
                                    }
                                })
                            }}
                            disabled={Boolean(isRequesting || !data.length)}
                            type="submit"
                            variant="contained"
                            color="primary">
                            <SaveIcon className={classes.iconSubmit} />
                            Cập nhật
                            {isRequesting ? (
                                <CircularProgress
                                    color="secondary"
                                    className={classes.circularProgress}
                                />
                            ) : null}
                        </Button>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(UpdateOrder)
