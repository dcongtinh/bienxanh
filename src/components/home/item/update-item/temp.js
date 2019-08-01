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
import SaveIcon from '@material-ui/icons/Save'
import ItemPriceForm from 'components/home/item/add-item/ItemPriceForm'

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
        this.state = {
            count: Math.max(props.item.itemPrices.length, 1),
            itemNameCode: props.item.itemNameCode,
            itemName: props.item.itemName,
            siteAdmin: false
        }
        let state = {}
        props.item.itemPrices.forEach((item, index) => {
            state[`itemPrice${index}`] = item.itemPrice
            state[`areaPrice${index}`] = item.areaPrice
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
    }
    handleCheckbox = (name, value) => {
        this.setState({ [name]: value })
    }
    render() {
        let { itemNameCode, itemName, count } = this.state
        let { classes, isRequesting, item } = this.props
        let idItem = item._id
        if (!item)
            return (
                <CircularProgress
                    color="secondary"
                    className={classes.circularProgress}
                />
            )
        let array = []
        for (let i = 0; i < count; ++i) array.push('')

        let initialValues = {
                itemNameCode,
                itemName
            },
            _AddItemSchema = {
                itemNameCode: Yup.string().required('* Bắt buộc'),
                itemName: Yup.string().required('* Bắt buộc')
            }
        array.forEach((item, index) => {
            let _initialValues = {
                [`itemPrice${index}`]: this.state[`itemPrice${index}`]
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
        return (
            <Container component="main" maxWidth="sm">
                <CssBaseline />
                <div className={classes.paper}>
                    <div className={classes.form}>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={AddItemSchema}
                            onSubmit={(values, { resetForm }) => {
                                let { itemNameCode, itemName } = values
                                let itemPrices = []
                                array.forEach((item, index) => {
                                    itemPrices.push({
                                        itemPrice: values[`itemPrice${index}`],
                                        areaPrice: this.state[
                                            `areaPrice${index}`
                                        ]
                                    })
                                })
                                this.props.updateItem({
                                    idItem,
                                    itemNameCode,
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
                                            <Grid item xs={12}>
                                                <TextField
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.itemNameCode}
                                                    label="Mã hàng hoá/dịch vụ"
                                                    name="itemNameCode"
                                                    error={
                                                        errors.itemNameCode &&
                                                        touched.itemNameCode
                                                    }
                                                    message={
                                                        errors.itemNameCode
                                                    }
                                                />
                                            </Grid>
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
                                                    message={errors.itemName}
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
                                                handleBlur={handleBlur}
                                                values={values}
                                                errors={errors}
                                                touched={touched}
                                                states={this.state}
                                                isUpdateItem
                                                idItem={idItem}
                                                updateItem={
                                                    this.props.updateItem
                                                }
                                                prices={item.itemPrices}
                                                itemNameCode={itemNameCode}
                                                itemName={itemName}
                                            />
                                        </Grid>
                                        <Button
                                            disabled={Boolean(
                                                isRequesting ||
                                                    errors.itemNameCode ||
                                                    errors.itemName ||
                                                    disabled
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

export default withStyles(styles)(UpdateItem)
