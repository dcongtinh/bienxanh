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
import Editable from 'components/Editable'
import moment from 'moment'

// import '../../../../image-gallary.css'
// import ImageGallery from 'react-image-gallery'

const NumberFormatCustom = (props) => {
    const { inputRef, onChange, ...other } = props
    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={(values) => {
                onChange({
                    target: {
                        value: values.value,
                    },
                })
            }}
            thousandSeparator
        />
    )
}

const styles = (theme) => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
        position: 'relative',
    },
    iconSubmit: {
        marginRight: theme.spacing(),
    },
    circularProgress: {
        position: 'absolute',
        width: '24px !important',
        height: '24px !important',
    },
    buttonSubmit: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: theme.spacing(2),
    },
    supplierName: {
        padding: '4px 0',
        maxWidth: 120,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    itemName: {
        width: 250,
    },
})

// const mock_images = [
//     {
//         original: 'https://picsum.photos/id/1018/1000/600/',
//         thumbnail: 'https://picsum.photos/id/1018/1000/600/',
//         originalHeight: 500,
//     },
//     {
//         original: 'https://picsum.photos/id/1015/1000/600/',
//         thumbnail: 'https://picsum.photos/id/1015/1000/600/',
//         originalHeight: 500,
//     },
//     {
//         original: 'https://picsum.photos/id/1019/1000/600/',
//         thumbnail: 'https://picsum.photos/id/1019/1000/600/',
//         originalHeight: 500,
//     },
// ]

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
            data: props.order.orders || [],
        }
    }
    handleDateChange = (date) => {
        this.setState({ date })
    }
    handleChange = (data) => {
        this.setState({ data })
    }
    handleChangeText = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    render() {
        let { buyerCode, warehouse, buyerName, itemNote, data } = this.state
        // console.log(data)
        let {
            classes,
            isRequesting,
            wareHouses,
            items,
            me,
            order,
            suppliers,
            users,
        } = this.props
        let idOrder = this.props.match.params.idOrder
        let optionsWarehouse = [],
            warehouseName = {}
        wareHouses.forEach((warehouse) => {
            warehouseName[
                warehouse._id
            ] = `${warehouse.warehouseName} (${warehouse.warehouse})`
            optionsWarehouse.push({
                value: warehouse._id,
                label: `${warehouse.warehouseName} (${warehouse.warehouse})`,
            })
        })
        let optionsItem = [],
            itemName = {}
        items.forEach((item) => {
            // itemName[item._id] = item.itemName
            itemName[item._id] = {
                name: item.itemName,
                unit: item.itemUnit.unitName,
            }
            optionsItem.push({
                value: item._id,
                label: item.itemName,
            })
        })
        let supplierList = [],
            name = {}
        suppliers.forEach((supplier) => {
            supplierList.push({
                value: supplier._id,
                label: supplier.supplierName,
            })
            name[supplier._id] = supplier.supplierName
        })

        let userList = [],
            nameUser = {}
        users.forEach((user) => {
            userList.push({
                value: user._id,
                label: user.username,
            })
            nameUser[user._id] = user.username
        })
        let columns = [
            {
                title: 'Hàng hoá',
                field: 'itemName',
                headerStyle: {
                    marginBottom: 4,
                },
                render: (rowData) => {
                    // return <div>{itemName[rowData.itemName].name}</div>
                    return (
                        <div>
                            <a
                                href={
                                    process.env.REACT_APP_URL +
                                    '/dashboard/items/view/' +
                                    rowData.itemName
                                }
                                target="_blank"
                                style={{
                                    color: 'black',
                                    'text-decoration': 'none',
                                }}
                            >
                                {itemName[rowData.itemName].name}
                            </a>
                        </div>
                    )
                },
                editComponent: (props) => {
                    let value
                    if (props.value)
                        value = {
                            value: props.value,
                            label: itemName[props.value].name,
                        }
                    return (
                        <Select
                            name="itemName"
                            value={value}
                            onChange={(data) => {
                                props.onChange(data.value)
                            }}
                            options={optionsItem}
                            className={'item-single-select'}
                            classNamePrefix={'select'}
                            placeholder="Chọn hàng hoá"
                            styles={{
                                multiValue: (base) => ({
                                    ...base,
                                    borderRadius: 16,
                                }),
                                option: (base) => ({
                                    ...base,
                                    maxWidth: '100%',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                }),
                            }}
                        />
                    )
                },
            },
            {
                title: 'Đơn vị tính',
                field: 'itemUnit',
                render: (rowData) => {
                    return <div>{itemName[rowData.itemName].unit}</div>
                },
            },
            {
                title: 'Số lượng',
                field: 'itemQuantity',
                render: (rowData) => {
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
                editComponent: (props) => (
                    <TextField
                        style={{ width: 60 }}
                        onChange={(e) => props.onChange(e.target.value)}
                        value={props.value}
                        name="itemQuantity"
                        InputProps={{
                            inputComponent: NumberFormatCustom,
                        }}
                    />
                ),
            },
            {
                title: 'Hao hụt',
                field: 'itemLoss',
                render: (rowData) => {
                    return (
                        <div>
                            {rowData.itemLoss
                                ? numeral(rowData.itemLoss).format(
                                      '(0,0.[0000])'
                                  )
                                : '-'}
                        </div>
                    )
                },
                editComponent: (props) => (
                    <TextField
                        style={{ width: 60 }}
                        onChange={(e) => props.onChange(e.target.value)}
                        value={props.value}
                        name="itemLoss"
                        InputProps={{
                            inputComponent: NumberFormatCustom,
                        }}
                    />
                ),
            },
            {
                title: 'NCC',
                field: 'itemSupplier',
                headerStyle: {
                    marginBottom: 4,
                },
                render: (rowData) => {
                    return (
                        <div className={classes.supplierName}>
                            {name[rowData.itemSupplier]}
                        </div>
                    )
                },
                editComponent: (props) => {
                    let data
                    if (props.value) {
                        data = {
                            value: props.value,
                            label: name[props.value],
                        }
                    }
                    return (
                        <Select
                            name="itemSupplier"
                            value={data}
                            onChange={(data) => {
                                props.onChange(data.value)
                            }}
                            options={supplierList}
                            className={'basic-single-select'}
                            classNamePrefix={'select'}
                            placeholder="Chọn NCC"
                            styles={{
                                multiValue: (base) => ({
                                    ...base,
                                    borderRadius: 16,
                                }),
                                option: (base) => ({
                                    ...base,
                                    maxWidth: '100%',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                }),
                            }}
                        />
                    )
                },
            },
            {
                title: 'NVGH',
                field: 'itemShipper',
                headerStyle: {
                    marginBottom: 4,
                },
                render: (rowData) => {
                    return (
                        <div className={classes.supplierName}>
                            {nameUser[rowData.itemShipper]}
                        </div>
                    )
                },
                editComponent: (props) => {
                    let data
                    if (props.value) {
                        data = {
                            value: props.value,
                            label: nameUser[props.value],
                        }
                    }
                    return (
                        <Select
                            name="itemShipper"
                            value={data}
                            onChange={(data) => {
                                props.onChange(data.value)
                            }}
                            options={userList}
                            className={'basic-single-select'}
                            classNamePrefix={'select'}
                            placeholder="Chọn nhân viên"
                            styles={{
                                multiValue: (base) => ({
                                    ...base,
                                    borderRadius: 16,
                                }),
                                option: (base) => ({
                                    ...base,
                                    maxWidth: '100%',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                }),
                            }}
                        />
                    )
                },
            },
            {
                title: 'Phí GH',
                field: 'itemFeeShip',
                render: (rowData) => {
                    return (
                        <div>
                            {rowData.itemFeeShip
                                ? numeral(rowData.itemFeeShip).format(
                                      '(0,0.[0000])'
                                  )
                                : '-'}
                        </div>
                    )
                },
                editComponent: (props) => (
                    <TextField
                        style={{ width: 70 }}
                        onChange={(e) => props.onChange(e.target.value)}
                        value={props.value}
                        name="itemFeeShip"
                        InputProps={{
                            inputComponent: NumberFormatCustom,
                        }}
                    />
                ),
            },
            {
                title: 'Phí VC',
                field: 'itemFeeNorth',
                render: (rowData) => {
                    return (
                        <div>
                            {rowData.itemFeeNorth
                                ? numeral(rowData.itemFeeNorth).format(
                                      '(0,0.[0000])'
                                  )
                                : '-'}
                        </div>
                    )
                },
                editComponent: (props) => (
                    <TextField
                        style={{ width: 70 }}
                        onChange={(e) => props.onChange(e.target.value)}
                        value={props.value}
                        name="itemFeeNorth"
                        InputProps={{
                            inputComponent: NumberFormatCustom,
                        }}
                    />
                ),
            },
            {
                title: 'Giá VCHK',
                field: 'itemFeeCentral',
                render: (rowData) => {
                    return (
                        <div>
                            {rowData.itemFeeCentral
                                ? numeral(rowData.itemFeeCentral).format(
                                      '(0,0.[0000])'
                                  )
                                : '-'}
                        </div>
                    )
                },
                editComponent: (props) => (
                    <TextField
                        style={{ width: 70 }}
                        onChange={(e) => props.onChange(e.target.value)}
                        value={props.value}
                        name="itemFeeCentral"
                        InputProps={{
                            inputComponent: NumberFormatCustom,
                        }}
                    />
                ),
            },
            {
                title: 'TL kiện',
                field: 'itemWeight',
                render: (rowData) => {
                    return (
                        <div>
                            {rowData.itemWeight
                                ? numeral(rowData.itemWeight).format(
                                      '(0,0.[0000])'
                                  )
                                : '-'}
                        </div>
                    )
                },
                editComponent: (props) => (
                    <TextField
                        style={{ width: 60 }}
                        onChange={(e) => props.onChange(e.target.value)}
                        value={props.value}
                        name="itemWeight"
                        InputProps={{
                            inputComponent: NumberFormatCustom,
                        }}
                    />
                ),
            },
            {
                title: 'NCC VC',
                field: 'itemTransfer',
                headerStyle: {
                    marginBottom: 4,
                },
                render: (rowData) => {
                    return (
                        <div className={classes.supplierName}>
                            {name[rowData.itemTransfer]}
                        </div>
                    )
                },
                editComponent: (props) => {
                    let data
                    if (props.value) {
                        data = {
                            value: props.value,
                            label: name[props.value],
                        }
                    }
                    return (
                        <Select
                            name="itemTransfer"
                            value={data}
                            onChange={(data) => {
                                props.onChange(data.value)
                            }}
                            options={supplierList}
                            className={'basic-single-select'}
                            classNamePrefix={'select'}
                            placeholder="Chọn NCC VC"
                            styles={{
                                multiValue: (base) => ({
                                    ...base,
                                    borderRadius: 16,
                                }),
                                option: (base) => ({
                                    ...base,
                                    maxWidth: '100%',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                }),
                            }}
                        />
                    )
                },
            },
        ]
        data.forEach((_order, index) => {
            delete _order._id
            if (order.itemName) {
                let idItem = _order.itemName
                let idWarehouse = this.state.warehouse || wareHouses[0]._id
                let item = items.filter((item) => {
                    return item._id === idItem
                })
                let prices = []
                item = item[0]
                item.itemPrices.forEach((itemPrice) => {
                    let match = itemPrice[idWarehouse] ? true : false
                    if (match)
                        prices.push({
                            dateApply: itemPrice.dateApply,
                            itemPrice: itemPrice[idWarehouse],
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
            }
        })

        if (!warehouse) warehouse = optionsWarehouse[0]
        else {
            warehouse = {
                value: warehouse,
                label: warehouseName[warehouse],
            }
        }
        let disabled = !data.length
        data.forEach((item) => {
            disabled |= !item.itemQuantity
        })
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
                                            ),
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
                                        onChange={(data) => {
                                            this.props.wareHouses.forEach(
                                                (wareHouse) => {
                                                    if (
                                                        wareHouse._id ===
                                                        data.value
                                                    ) {
                                                        this.setState({
                                                            buyerCode:
                                                                wareHouse.buyerCode,
                                                            warehouse:
                                                                data.value,
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
                <Editable
                    title={`Hoá đơn số ${order.group}`}
                    data={data}
                    columns={columns}
                    handleChange={this.handleChange}
                    pageSize={data.length}
                />
                {/* <ImageGallery items={mock_images} originalHeight={500} /> */}
                <Grid item container spacing={2}>
                    <Grid item xs={12} className={classes.buttonSubmit}>
                        <Button
                            onClick={() => {
                                let warehouse =
                                    this.state.warehouse ||
                                    optionsWarehouse[0].value
                                let buyerName = `26296/WH${buyerCode}/${this.state.buyerName}`
                                this.props.updateOrder({
                                    idOrder,
                                    data: {
                                        warehouse,
                                        buyerName,
                                        orders: data,
                                        // owner: me._id,
                                        updater: me._id,
                                        itemNote,
                                        date: this.state.date,
                                    },
                                })
                            }}
                            disabled={Boolean(isRequesting || disabled)}
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
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
