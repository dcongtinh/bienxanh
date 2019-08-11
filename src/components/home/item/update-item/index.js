import React from 'react'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import TextField from 'components/Input/TextField'
import CircularProgress from '@material-ui/core/CircularProgress'
import SendIcon from '@material-ui/icons/Send'
import ItemPriceForm from 'components/home/item/add-item/ItemPriceForm'
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
    }
})

class UpdateItem extends React.Component {
    constructor(props) {
        super(props)
        let { itemPrices } = props.item
        let _itemPrices = JSON.parse(JSON.stringify(itemPrices))
        itemPrices.sort((a, b) => {
            return (
                new Date(b.dateApply).getTime() -
                new Date(a.dateApply).getTime()
            )
        })
        _itemPrices.sort((a, b) => {
            return (
                new Date(b.dateApply).getTime() -
                new Date(a.dateApply).getTime()
            )
        })
        let datas = _itemPrices
        for (let i in datas) {
            if (datas[i].wareHouses.length) datas[i] = datas[i].wareHouses
            if (!datas[i][0]) datas[i][0] = []
            if (!datas[i][1]) datas[i][1] = []
            if (!datas[i][2]) datas[i][2] = []
        }
        this.state = {
            count: Math.max(itemPrices.length, 1),
            itemName: props.item.itemName,
            itemPrices,
            datas
        }

        let state = {}
        props.item.itemPrices.forEach((item, index) => {
            state[`dateApply${index}`] = item.dateApply
        })
        this.state = Object.assign({}, this.state, state)
    }
    handleChangeCount = count => {
        this.setState({ count })
    }
    handleCheckbox = (name, value) => {
        this.setState({ [name]: value })
    }
    handleSelect = datas => {
        this.setState({ datas })
    }
    handleChangeOption = data => {
        this.setState({ data: data || [] })
    }
    handleChangeDate = (name, value) => {
        this.setState({ [name]: value })
    }
    render() {
        let { count, itemName, itemPrices } = this.state
        let { classes, item, isRequesting, wareHouses, history } = this.props
        let idItem = item._id
        let array = []
        for (let i = 0; i < count; ++i) array.push('')

        let initialValues = {
                itemName
            },
            _AddItemSchema = {
                itemName: Yup.string().required('* Bắt buộc')
            }
        array.forEach((item, index) => {
            let _initialValues = {
                [`itemPrice${index}`]: itemPrices[index]
                    ? itemPrices[index].itemPrice
                    : [],
                [`dateApply${index}`]: itemPrices[index]
                    ? itemPrices[index].dateApply
                    : new Date()
            }
            initialValues = Object.assign({}, initialValues, _initialValues)

            let _addItemSchema = {
                [`itemPrice${index}`]: Yup.number('Not a numbBar').required(
                    '* Bắt buộc'
                )
            }
            _AddItemSchema = Object.assign({}, _AddItemSchema, _addItemSchema)
        })
        let AddItemSchema = Yup.object().shape(_AddItemSchema)

        let area = []
        for (let i = 0; i < 3; ++i) {
            area[i] = wareHouses.filter(warehouse => {
                return warehouse.buyerArea === i
            })
        }
        let options = []
        for (let i = 0; i < 3; ++i) {
            options[i] = []
            area[i].forEach(warehouse => {
                options[i].push({
                    value: warehouse._id,
                    label: warehouse.warehouseName
                })
            })
        }
        return (
            <Container component="main">
                <CssBaseline />
                <div className={classes.paper}>
                    <div className={classes.form}>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={AddItemSchema}
                            onSubmit={(values, { resetForm }) => {
                                let { itemName } = values
                                let { datas } = this.state

                                let itemPrices = []
                                array.forEach((item, index) => {
                                    let date =
                                        this.state[`dateApply${index}`] ||
                                        new Date()
                                    itemPrices.push({
                                        itemPrice: values[`itemPrice${index}`],
                                        wareHouses: datas[index],
                                        customDateApply: moment(date).format(
                                            'YYYY/MM/DD'
                                        ),
                                        dateApply: date
                                    })
                                })
                                this.props.updateItem({
                                    idItem,
                                    itemName,
                                    itemPrices
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
                                array.forEach((item, index) => {
                                    disabled |=
                                        errors[`itemPrice${index}`] &&
                                        touched[`itemPrice${index}`]
                                })
                                return (
                                    <Form>
                                        <Grid item container spacing={2}>
                                            <Grid
                                                item
                                                container
                                                lg={6}
                                                md={6}
                                                xl={6}
                                                xs={12}
                                                spacing={2}>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.itemName}
                                                        label="Tên hàng hoá/dịch vụ"
                                                        name="itemName"
                                                        error={
                                                            errors.itemName &&
                                                            touched.itemName
                                                        }
                                                        message={
                                                            errors.itemName
                                                        }
                                                    />
                                                </Grid>
                                                <ItemPriceForm
                                                    array={array}
                                                    handleChange={handleChange}
                                                    handleChangeCount={
                                                        this.handleChangeCount
                                                    }
                                                    handleCheckbox={
                                                        this.handleCheckbox
                                                    }
                                                    handleChangeDate={
                                                        this.handleChangeDate
                                                    }
                                                    handleBlur={handleBlur}
                                                    values={values}
                                                    errors={errors}
                                                    touched={touched}
                                                    states={this.state}
                                                    options={options}
                                                    handleSelect={
                                                        this.handleSelect
                                                    }
                                                    isUpdateItem
                                                    idItem={idItem}
                                                    updateItem={
                                                        this.props.updateItem
                                                    }
                                                    prices={itemPrices}
                                                    itemName={itemName}
                                                    deleteItems={
                                                        this.props.deleteItems
                                                    }
                                                    history={history}
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                lg={6}
                                                md={6}
                                                xl={6}
                                                xs={12}>
                                                abc
                                            </Grid>
                                        </Grid>
                                        <Button
                                            disabled={Boolean(
                                                isRequesting ||
                                                    errors.itemName ||
                                                    disabled
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

export default withStyles(styles)(UpdateItem)
