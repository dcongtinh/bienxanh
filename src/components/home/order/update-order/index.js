import React from 'react'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import TextField from 'components/Input/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import SaveIcon from '@material-ui/icons/Save'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import CircularProgress from '@material-ui/core/CircularProgress'
import AddItemForm from 'components/home/order/add-order/AddItemForm'
import Select from 'components/Input/Select'
import moment from 'moment'

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
    submit: {
        margin: theme.spacing(2, 0),
        position: 'absolute',
        right: 0
    },
    iconSubmit: {
        marginRight: theme.spacing()
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
        margin: theme.spacing(1),
        border: '1px solid ' + theme.palette.border
    }
})

class UpdateOrder extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            count: Math.max(props.order.items.length, 1),
            buyerArea: props.order.warehouse.buyerArea,
            buyerCode: props.order.warehouse.buyerCode,
            warehouse: props.order.warehouse._id,
            date: props.order.createdAt || new Date()
        }
        let state = {}
        props.order.items.forEach((item, index) => {
            state[`itemName${index}`] = item.itemName._id
            state[`itemQuantity${index}`] = item.itemQuantity
            state[`itemPrice${index}`] = item.itemPrice
            state[`itemNote${index}`] = item.itemNote
        })
        this.state = Object.assign({}, this.state, state)
    }
    handleChangeCount = count => {
        this.setState({ count })
    }
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
            [`error${e.target.name}`]: false
        })
        if (e.target.name === 'warehouse') {
            this.props.wareHouses.forEach(wareHouse => {
                if (wareHouse._id === e.target.value)
                    this.setState({ buyerCode: wareHouse.buyerCode })
            })
        }
    }
    handleDateChange = date => {
        this.setState({ date })
    }
    render() {
        let { count, buyerCode, warehouse } = this.state
        let {
            classes,
            isRequesting,
            wareHouses,
            items,
            me,
            order,
            history
        } = this.props
        let orderItems = order.items
        let idOrder = this.props.match.params.idOrder
        let optionsWarehouse = []
        wareHouses.forEach(warehouse => {
            optionsWarehouse.push({
                value: warehouse._id,
                label: `${warehouse.warehouseName} (${warehouse.warehouse})`
            })
        })
        let optionsItem = []
        items.forEach(item => {
            optionsItem.push({
                value: item._id,
                label: `${item.itemName} (${item.itemNameCode})`
            })
        })
        let array = []
        for (let i = 0; i < count; ++i) array.push('')

        let initialValues = {},
            _AddOrderSchema = {}
        array.forEach((item, index) => {
            let _initialValues = {
                [`itemQuantity${index}`]:
                    this.state[`itemQuantity${index}`] || 1,
                [`itemNote${index}`]: this.state[`itemNote${index}`]
            }
            initialValues = Object.assign({}, initialValues, _initialValues)

            let _addOrderSchema = {
                [`itemQuantity${index}`]: Yup.number('Not a numbBar').required(
                    '* Bắt buộc'
                ),
                [`itemNote${index}`]: Yup.string()
            }
            _AddOrderSchema = Object.assign(
                {},
                _AddOrderSchema,
                _addOrderSchema
            )
        })
        let { buyerName } = order
        let lastIndex = buyerName.lastIndexOf('/') + 1
        initialValues = Object.assign({}, initialValues, {
            group: order.group,
            buyerName: buyerName.substring(lastIndex, buyerName.length)
        })
        _AddOrderSchema = Object.assign({}, _AddOrderSchema, {
            group: Yup.number().required('* Bắt buộc'),
            buyerName: Yup.string()
        })
        let AddOrderSchema = Yup.object().shape(_AddOrderSchema)
        let pricesList = []
        array.forEach((__item__, index) => {
            let idItem = this.state[`itemName${index}`] || optionsItem[0].value
            let idWarehouse = this.state.warehouse || wareHouses[0]._id
            let item = items.filter(item => {
                return item._id === idItem
            })
            item = item[0]
            let warehouse = wareHouses.filter(warehouse => {
                return warehouse._id === idWarehouse
            })
            warehouse = warehouse[0]
            let { buyerArea } = warehouse
            let prices = []
            item.itemPrices.forEach(itemPrice => {
                let match = itemPrice.wareHouses[buyerArea].filter(
                    warehouse => {
                        return warehouse.value === idWarehouse
                    }
                )
                if (match.length)
                    prices.push({
                        dateApply: itemPrice.dateApply,
                        itemPrice: itemPrice.itemPrice
                    })
            })
            prices.sort((a, b) => {
                return (
                    new Date(b.dateApply).getTime() -
                    new Date(a.dateApply).getTime()
                )
            })
            let date = moment(this.state.date).format('YYYY/MM/DD')
            for (let i in prices) {
                let item = prices[i]
                let dateApply = moment(item.dateApply).format('YYYY/MM/DD')
                if (date >= dateApply) {
                    var price = item.itemPrice
                    break
                }
            }
            pricesList.push(price)
        })
        return (
            <Container component="main" maxWidth="sm">
                <CssBaseline />
                <div className={classes.paper}>
                    <div className={classes.form}>
                        <Formik
                            enableReinitialize
                            initialValues={initialValues}
                            validationSchema={AddOrderSchema}
                            onSubmit={(values, { resetForm }) => {
                                let warehouse =
                                    this.state.warehouse ||
                                    optionsWarehouse[0].value
                                let _items = []
                                array.forEach((__item__, index) => {
                                    let itemPrice = pricesList[index] || 0
                                    let itemName =
                                        this.state[`itemName${index}`] ||
                                        optionsItem[0].value

                                    let _item = {
                                        itemName,
                                        itemQuantity:
                                            values[`itemQuantity${index}`],
                                        itemPrice,
                                        itemNote: values[`itemNote${index}`]
                                    }
                                    _items.push(_item)
                                })
                                let buyerName = `26296/WH${buyerCode}/${
                                    values.buyerName
                                }`
                                this.props.updateOrder({
                                    idOrder,
                                    data: {
                                        warehouse,
                                        buyerName,
                                        items: _items,
                                        owner: me._id
                                    },
                                    callback: () =>
                                        this.props.fetchOrder({ idOrder })
                                })
                            }}>
                            {({
                                values,
                                errors,
                                touched,
                                handleChange,
                                handleBlur,
                                handleSubmit
                            }) => {
                                let disabled = false
                                array.forEach((__item__, index) => {
                                    disabled |=
                                        errors[`itemQuantity${index}`] &&
                                        touched[`itemQuantity${index}`]
                                })
                                return (
                                    <Form>
                                        <Grid item container spacing={2}>
                                            <Grid item xs={12} sm={3}>
                                                <TextField
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.group}
                                                    label="Mã hoá đơn"
                                                    name="group"
                                                    InputProps={{
                                                        readOnly: true
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.buyerName}
                                                    label="Họ tên"
                                                    name="buyerName"
                                                    norequired
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                {`26296/WH${buyerCode}/`}
                                                            </InputAdornment>
                                                        )
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={3}>
                                                <TextField
                                                    value={moment(
                                                        this.state.date
                                                    ).format('DD/MM/YYYY')}
                                                    label="Ngày áp dụng"
                                                    InputProps={{
                                                        readOnly: true
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Select
                                                    name="warehouse"
                                                    value={
                                                        warehouse ||
                                                        optionsWarehouse[0]
                                                            .value
                                                    }
                                                    label="Nhập kho"
                                                    onChange={this.handleChange}
                                                    options={optionsWarehouse}
                                                />
                                            </Grid>
                                            <AddItemForm
                                                array={array}
                                                handleChange={handleChange}
                                                handleChangeCount={
                                                    this.handleChangeCount
                                                }
                                                handleBlur={handleBlur}
                                                values={values}
                                                errors={errors}
                                                touched={touched}
                                                optionsItem={optionsItem}
                                                states={this.state}
                                                handleSelectChange={
                                                    this.handleChange
                                                }
                                                isUpdateOrder
                                                updateOrder={
                                                    this.props.updateOrder
                                                }
                                                fetchOrder={
                                                    this.props.fetchOrder
                                                }
                                                deleteOrders={
                                                    this.props.deleteOrders
                                                }
                                                items={items}
                                                orderItems={orderItems}
                                                warehouse={warehouse}
                                                wareHouses={wareHouses}
                                                buyerName={buyerName}
                                                idOrder={idOrder}
                                                history={history}
                                                prices={pricesList}
                                            />
                                        </Grid>
                                        <Button
                                            disabled={Boolean(
                                                isRequesting || disabled
                                            )}
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            className={classes.submit}>
                                            <SaveIcon
                                                className={classes.iconSubmit}
                                            />
                                            Cập nhật
                                            {isRequesting ? (
                                                <CircularProgress
                                                    color="secondary"
                                                    className={
                                                        classes.circularProgress
                                                    }
                                                />
                                            ) : null}
                                        </Button>
                                    </Form>
                                )
                            }}
                        </Formik>
                    </div>
                </div>
            </Container>
        )
    }
}

export default withStyles(styles)(UpdateOrder)
