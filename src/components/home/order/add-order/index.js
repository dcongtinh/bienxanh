import React from 'react'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import TextFieldCustomized from 'components/Input/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import SendIcon from '@material-ui/icons/Send'
import CircularProgress from '@material-ui/core/CircularProgress'
import Select from 'react-select'
import numeral from 'numeral'
import { DatePicker } from '@material-ui/pickers'
import NumberFormat from 'react-number-format'
import Editable from 'components/Editable'
import moment from 'moment'
// import ImageUploader from 'react-images-upload'

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
        maxWidth: 200,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
})

class AddOrder extends React.Component {
    constructor(props) {
        super(props)
        let { wareHouses, items } = props
        let optionsWarehouse = [],
            warehouseName = {}
        wareHouses.forEach((warehouse) => {
            warehouseName[warehouse._id] = {
                wh: `${warehouse.warehouseName} (${warehouse.warehouse})`,
                buyerName: warehouse.buyerName,
            }
            optionsWarehouse.push({
                value: warehouse._id,
                label: `${warehouse.warehouseName} (${warehouse.warehouse})`,
            })
        })
        let optionsItem = [],
            itemName = {}
        items.forEach((item) => {
            itemName[item._id] = item.itemName
            optionsItem.push({
                value: item._id,
                label: item.itemName,
            })
        })

        let data = [],
            pageSize = 20
        for (let i = 0; i < pageSize; ++i) data.push({})
        this.state = {
            data,
            warehouse: optionsWarehouse[0].value,
            buyerCode: wareHouses[0].buyerCode,
            buyerName: '',
            itemNote: '',
            date: new Date(),
            optionsWarehouse,
            warehouseName,
            optionsItem,
            itemName,
            pageSize,
            images: [],
        }
        this.onDrop = this.onDrop.bind(this)
    }
    onDrop = async (imageFiles, imageDataURLs) => {
        this.setState({ images: this.state.images.concat(imageDataURLs) })
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
        let {
            warehouse,
            buyerCode,
            buyerName,
            data,
            itemNote,
            optionsWarehouse,
            warehouseName,
            optionsItem,
            itemName,
            pageSize,
        } = this.state
        let { classes, isRequesting, wareHouses, items, suppliers, users, me } =
            this.props
        let supplierList = [],
            nameSupplier = {}
        suppliers.forEach((supplier) => {
            supplierList.push({
                value: supplier._id,
                label: supplier.supplierName,
            })
            nameSupplier[supplier._id] = supplier.supplierName
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
                    return (
                        <div className={classes.supplierName}>
                            {itemName[rowData.itemName]}
                        </div>
                    )
                },
                editComponent: (props) => {
                    let data
                    if (props.value) {
                        data = {
                            value: props.value,
                            label: itemName[props.value],
                        }
                    } else {
                        data = optionsItem[0]
                        props.onChange(data.value)
                    }
                    return (
                        <Select
                            name="itemName"
                            value={data}
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
                title: 'Số lượng',
                field: 'itemQuantity',
                render: (rowData) => {
                    return (
                        <div>
                            {rowData.itemQuantity
                                ? numeral(rowData.itemQuantity).format(
                                      '(0,0.[0000])'
                                  ) + ' KG'
                                : '-'}
                        </div>
                    )
                },
                editComponent: (props) => {
                    if (props.value === undefined) {
                        props.onChange(0.0001)
                    }
                    return (
                        <TextField
                            style={{ width: 60 }}
                            onChange={(e) => props.onChange(e.target.value)}
                            value={props.value}
                            name="itemQuantity"
                            InputProps={{
                                inputComponent: NumberFormatCustom,
                            }}
                        />
                    )
                },
            },
            {
                title: 'Hao hụt',
                headerStyle: {
                    padding: 0,
                },
                cellStyle: {
                    padding: 0,
                },
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
                headerStyle: {
                    padding: 0,
                },
                field: 'itemSupplier',
                render: (rowData) => {
                    return (
                        <div className={classes.supplierName}>
                            {nameSupplier[rowData.itemSupplier]}
                        </div>
                    )
                },
                editComponent: (props) => {
                    let data
                    if (props.value) {
                        data = {
                            value: props.value,
                            label: nameSupplier[props.value],
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
            // {
            //     title: 'Phí GHMN',
            //     field: 'itemFeeSouth',
            //     render: rowData => {
            //         return (
            //             <div>
            //                 {rowData.itemFeeSouth
            //                     ? numeral(rowData.itemFeeSouth).format(
            //                           '(0,0.[0000])'
            //                       )
            //                     : '-'}
            //             </div>
            //         )
            //     },
            //     editComponent: props => (
            //         <TextField
            //             style={{ width: 70 }}
            //             onChange={e => props.onChange(e.target.value)}
            //             value={props.value}
            //             name="itemFeeSouth"
            //             InputProps={{
            //                 inputComponent: NumberFormatCustom
            //             }}
            //         />
            //     )
            // },
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
                            {nameSupplier[rowData.itemTransfer]}
                        </div>
                    )
                },
                editComponent: (props) => {
                    let data
                    if (props.value) {
                        data = {
                            value: props.value,
                            label: nameSupplier[props.value],
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
        data.forEach((order, index) => {
            // delete order.tableData
            if (order.itemName) {
                let idItem = order.itemName
                let idWarehouse = this.state.warehouse || wareHouses[0]._id
                let item = items.filter((item) => {
                    return item._id === idItem
                })
                let prices = [],
                    tradePrices = []
                item = item[0]
                item.itemPrices.forEach((itemPrice) => {
                    let match = itemPrice[idWarehouse] ? true : false
                    if (match)
                        prices.push({
                            dateApply: itemPrice.dateApply,
                            itemPrice: itemPrice[idWarehouse],
                        })
                })
                item.itemTradePrices.forEach((itemTradePrice) => {
                    let match = itemTradePrice[idWarehouse] ? true : false
                    match &= suppliers.some((supplier) => {
                        return supplier._id === order.itemSupplier
                            ? supplier.supplierItems.some((item) => {
                                  return item.value === order.itemName
                              })
                            : false
                    })
                    if (match)
                        tradePrices.push({
                            dateApply: itemTradePrice.dateApply,
                            itemTradePrice: itemTradePrice[idWarehouse],
                        })
                })
                prices.sort((a, b) => {
                    return (
                        new Date(b.dateApply).getTime() -
                        new Date(a.dateApply).getTime()
                    )
                })
                tradePrices.sort((a, b) => {
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

                let tradePrice = 0
                for (let i in tradePrices) {
                    let item = tradePrices[i]
                    let dateApply = moment(item.dateApply).format('YYYY/MM/DD')
                    if (date >= dateApply) {
                        tradePrice = item.itemTradePrice
                        break
                    }
                }
                order.itemPrice = price
                order.itemTradePrice = tradePrice
            }
        })
        warehouse = {
            value: warehouse,
            label: warehouseName[warehouse].wh,
        }
        // let disabled = !data.length
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
                    data={data}
                    columns={columns}
                    pageSize={pageSize}
                    handleChange={this.handleChange}
                />
                {/* <ImageUploader
                    withIcon={false}
                    withPreview={true}
                    buttonText="Chọn hoá đơn"
                    onChange={this.onDrop}
                    imgExtension={['.jpg', '.jpeg', '.gif', '.png']}
                    maxFileSize={5242880}
                /> */}
                <Grid item container spacing={2}>
                    <Grid item xs={12} className={classes.buttonSubmit}>
                        <Button
                            onClick={() => {
                                let els = document.getElementsByClassName(
                                    'uploadPictureContainer'
                                )
                                for (var i = 0; i < els.length; i++) {
                                    els[i].style.display = 'none'
                                }
                                let warehouse =
                                    this.state.warehouse ||
                                    optionsWarehouse[0].value
                                let { date, images } = this.state
                                // console.log(images)
                                let _data = data.filter((item) => {
                                    return item.itemName
                                })
                                let buyerName = `26296/WH${buyerCode}/${this.state.buyerName}`
                                let initData = []
                                for (let i = 0; i < pageSize; ++i)
                                    initData.push({})
                                this.props.addOrder({
                                    warehouse,
                                    buyerName,
                                    owner: me._id,
                                    updater: me._id,
                                    date,
                                    itemNote,
                                    orders: _data,
                                    images,
                                    callback: () => {
                                        this.setState({
                                            data: initData,
                                            date: new Date(),
                                            itemNote: '',
                                            images: [],
                                        })
                                    },
                                })
                            }}
                            disabled={Boolean(isRequesting)}
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
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
