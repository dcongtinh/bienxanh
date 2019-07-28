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
        count: 1
    }
    handleChangeCount = count => {
        this.setState({ count })
    }
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
            [`error${e.target.name}`]: false
        })
    }
    render() {
        let { count } = this.state
        let { classes, isRequesting, wareHouses, items, me } = this.props
        if (!wareHouses.length || !items.length) return null
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
                // [`batchNo${index}`]: '',
                [`itemQuantity${index}`]: 1,
                [`itemPrice${index}`]: '',
                [`itemNote${index}`]: ''
            }
            initialValues = Object.assign({}, initialValues, _initialValues)

            let _addOrderSchema = {
                // [`batchNo${index}`]: Yup.string().required('* Bắt buộc'),
                [`itemQuantity${index}`]: Yup.number('Not a numbBar').required(
                    '* Bắt buộc'
                ),
                [`itemPrice${index}`]: Yup.number().required('* Bắt buộc'),
                [`itemNote${index}`]: Yup.string()
            }
            _AddOrderSchema = Object.assign(
                {},
                _AddOrderSchema,
                _addOrderSchema
            )
        })
        let AddOrderSchema = Yup.object().shape(_AddOrderSchema)
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
                                let items = []
                                array.forEach((item, index) => {
                                    let _item = {
                                        itemName:
                                            this.state[`itemName${index}`] ||
                                            optionsItem[0].value,
                                        // batchNo: values[`batchNo${index}`],
                                        itemQuantity:
                                            values[`itemQuantity${index}`],
                                        itemPrice: values[`itemPrice${index}`],
                                        itemNote: values[`itemNote${index}`]
                                    }
                                    items.push(_item)
                                })
                                this.props.addOrder({
                                    warehouse,
                                    items,
                                    owner: me._id,
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
                                array.forEach((item, index) => {
                                    // disabled |=
                                    //     errors[`batchNo${index}`] &&
                                    //     touched[`batchNo${index}`]
                                    disabled |=
                                        errors[`itemQuantity${index}`] &&
                                        touched[`itemQuantity${index}`]
                                    disabled |=
                                        errors[`itemPrice${index}`] &&
                                        touched[`itemPrice${index}`]
                                })
                                return (
                                    <Form>
                                        <Grid item container spacing={2}>
                                            <Grid item xs={12}>
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
                                                options={optionsItem}
                                                states={this.state}
                                                handleSelectChange={
                                                    this.handleChange
                                                }
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
