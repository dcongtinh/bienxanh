import React from 'react'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import TextFieldCustomized from 'components/Input/TextField'
import SendIcon from '@material-ui/icons/Send'
import CircularProgress from '@material-ui/core/CircularProgress'
import Select from 'react-select'
import numeral from 'numeral'
import { DatePicker } from '@material-ui/pickers'
import NumberFormat from 'react-number-format'
import OrdersTable from './OrdersTable'
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

class AddOrder extends React.Component {
    constructor(props) {
        super(props)
        let { wareHouses, items } = props
        let optionsWarehouse = [],
            warehouseName = {}
        wareHouses.forEach(warehouse => {
            warehouseName[warehouse._id] = {
                wh: `${warehouse.warehouseName} (${warehouse.warehouse})`,
                buyerName: warehouse.buyerName
            }
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

        let data = []
        for (let i = 0; i < 5; ++i) data.push({})
        this.state = {
            data,
            warehouse: optionsWarehouse[0].value,
            itemNote: '',
            date: new Date(),
            optionsWarehouse,
            warehouseName,
            optionsItem,
            itemName
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
        let {
            warehouse,
            data,
            itemNote,
            optionsWarehouse,
            warehouseName,
            optionsItem,
            itemName
        } = this.state
        console.log(data)
        let {
            classes,
            isRequesting,
            wareHouses,
            items,
            suppliers,
            me
        } = this.props
        let supplierList = [],
            name = {}
        suppliers.forEach(supplier => {
            // for (let i in supplier.supplierItems) {
            // if (supplier.supplierItems[i].value === idItem) {
            supplierList.push({
                value: supplier._id,
                label: supplier.supplierName
            })
            name[supplier._id] = supplier.supplierName
            //     break
            // }
            // }
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
                title: 'Nhà cung cấp',
                field: 'itemSupplier',
                headerStyle: {
                    marginBottom: 4
                },
                render: rowData => {
                    return (
                        <div className={classes.supplierName}>
                            {name[rowData.itemSupplier]}
                        </div>
                    )
                },
                editComponent: props => {
                    let data
                    if (props.value) {
                        data = {
                            value: props.value,
                            label: name[props.value]
                        }
                    }
                    return (
                        <Select
                            name="itemSupplier"
                            value={data}
                            onChange={data => {
                                props.onChange(data.value)
                            }}
                            options={supplierList}
                            className={'basic-single-select'}
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
        data.forEach((order, index) => {
            delete order.tableData
            if (order.itemName) {
                let idItem = order.itemName
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
                order.itemPrice = price
            }
        })
        warehouse = {
            value: warehouse,
            label: warehouseName[warehouse].wh
        }
        let disabled = !data.length
        // data.forEach(item => {
        //     disabled |= !item.itemQuantity
        // })

        return (
            <div>
                <Container component="main" maxWidth="sm">
                    <CssBaseline />
                    <div className={classes.paper}>
                        <div className={classes.form}>
                            <Grid item container spacing={2}>
                                <Grid item xs={12}>
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
                                let { date } = this.state
                                let _data = data.filter(item => {
                                    return item.itemName && item.itemQuantity
                                })
                                this.props.addOrder({
                                    warehouse,
                                    owner: me._id,
                                    date,
                                    itemNote,
                                    orders: _data,
                                    callback: () => {
                                        this.setState({
                                            data: [],
                                            date: new Date(),
                                            warehouse: wareHouses[0]._id,
                                            itemNote: ''
                                        })
                                    }
                                })
                            }}
                            disabled={Boolean(isRequesting || disabled)}
                            type="submit"
                            variant="contained"
                            color="primary">
                            <SendIcon className={classes.iconSubmit} />
                            Gửi
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

export default withStyles(styles)(AddOrder)
