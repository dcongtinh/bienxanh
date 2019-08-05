import 'date-fns'
import React from 'react'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import CircularProgress from '@material-ui/core/CircularProgress'
import SendIcon from '@material-ui/icons/Send'
import AddItemForm from './AddItemForm'
import Select from 'components/Input/Select'
import { InlineDatePicker } from 'material-ui-pickers'
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

class AddOrder extends React.Component {
    state = {
        count: 1,
        date: new Date()
    }
    handleChangeCount = count => {
        this.setState({ count })
    }
    handleChange = (e, callback) => {
        this.setState(
            {
                [e.target.name]: e.target.value,
                [`error${e.target.name}`]: false
            },
            () => {
                if (typeof callback === 'function') callback()
            }
        )
    }
    handleDateChange = date => {
        this.setState({ date })
    }
    render() {
        let { count } = this.state
        let { classes, isRequesting, wareHouses, items, me } = this.props
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
                label: item.itemName
            })
        })
        let array = []
        for (let i = 0; i < count; ++i) array.push('')

        let initialValues = {},
            _AddOrderSchema = {}
        array.forEach((item, index) => {
            let _initialValues = {
                [`itemQuantity${index}`]: 1,
                [`itemNote${index}`]: ''
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
                                let { date } = this.state
                                let _items = []
                                array.forEach((__item__, index) => {
                                    let itemName =
                                        this.state[`itemName${index}`] ||
                                        optionsItem[0].value

                                    let _item = {
                                        itemName,
                                        itemQuantity:
                                            values[`itemQuantity${index}`] || 1,
                                        itemPrice: pricesList[index] || 0,
                                        itemNote: values[`itemNote${index}`]
                                    }
                                    _items.push(_item)
                                })
                                this.props.addOrder({
                                    warehouse,
                                    items: _items,
                                    owner: me._id,
                                    createdAt: moment(date).format(),
                                    callback: () => {
                                        resetForm()
                                        this.setState({ count: 1 })
                                    }
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
                                            <Grid item xs={12} sm={8}>
                                                <Select
                                                    name="warehouse"
                                                    value={
                                                        this.state.warehouse ||
                                                        optionsWarehouse[0]
                                                            .value
                                                    }
                                                    label="Nhập kho"
                                                    onChange={this.handleChange}
                                                    options={optionsWarehouse}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={4}>
                                                <InlineDatePicker
                                                    name="date"
                                                    variant="outlined"
                                                    format="DD/MM/YYYY"
                                                    label="Ngày nhập"
                                                    value={this.state.date}
                                                    onChange={
                                                        this.handleDateChange
                                                    }
                                                    fullWidth
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
                                                items={items}
                                                wareHouses={wareHouses}
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
                                            <SendIcon
                                                className={classes.iconSubmit}
                                            />
                                            Gửi
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

export default withStyles(styles)(AddOrder)
