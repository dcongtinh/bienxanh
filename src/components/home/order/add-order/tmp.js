import 'date-fns'
import React from 'react'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import TextField from 'components/Input/TextField'
import { withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import CircularProgress from '@material-ui/core/CircularProgress'
import SendIcon from '@material-ui/icons/Send'
import Select from 'components/Input/Select'
import { DatePicker } from '@material-ui/pickers'

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
        date: new Date()
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

        let initialValues = { itemNote: '' }
        let AddOrderSchema = Yup.object().shape({
            itemNote: Yup.string()
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
                                this.props.addOrder({
                                    warehouse,
                                    owner: me._id,
                                    date,
                                    itemNote: values.itemNote,
                                    callback: order => {
                                        resetForm()
                                        this.props.history.push(
                                            `/dashboard/orders/${order._id}`
                                        )
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
                                                <DatePicker
                                                    autoOk
                                                    inputVariant="outlined"
                                                    name="date"
                                                    variant="inline"
                                                    format="DD/MM/YYYY"
                                                    label="Ngày nhập"
                                                    value={this.state.date}
                                                    onChange={
                                                        this.handleDateChange
                                                    }
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.itemNote}
                                                    label="Ghi chú"
                                                    name={'itemNote'}
                                                    norequired={true}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Button
                                            disabled={Boolean(isRequesting)}
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
