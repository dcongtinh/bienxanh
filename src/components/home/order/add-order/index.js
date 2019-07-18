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

import Select from 'components/Input/Select'
const AddOrderSchema = Yup.object().shape({
    // warehouse: Yup.string().required('* Bắt buộc')
    itemName: Yup.string().required('* Bắt buộc')
})

const styles = theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white
        }
    },
    paper: {
        marginTop: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3)
    },
    submit: {
        margin: theme.spacing(2, 0)
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
    }
})

let initialValues = {
    // warehouse: ''
    itemName: ''
}
class AddOrder extends React.Component {
    state = {
        warehouse: '',
        errorWarehouse: false,
        itemName: '',
        errorItemName: false
    }
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
            errorWarehouse: false
        })
    }
    render() {
        let { classes, isRequesting, wareHouses, items } = this.props
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
        return (
            <Container component="main" maxWidth="sm">
                <CssBaseline />
                <div className={classes.paper}>
                    <div className={classes.form}>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={AddOrderSchema}
                            onSubmit={(values, { resetForm }) => {
                                if (!this.state.warehouse)
                                    this.setState({
                                        errorWarehouse: 'Required'
                                    })
                                console.log('cc')
                                // let { warehouse } = values
                                // this.props.addItem({
                                //     warehouse,
                                //     callback: () => resetForm()
                                // })
                            }}>
                            {({
                                values,
                                errors,
                                touched,
                                handleChange,
                                handleBlur,
                                handleSubmit
                            }) => (
                                <Form>
                                    <Grid item container spacing={2}>
                                        <Grid item xs={12}>
                                            <Select
                                                name="warehouse"
                                                value={this.state.warehouse}
                                                label="Nhập kho"
                                                onChange={this.handleChange}
                                                error={
                                                    this.state.errorWarehouse
                                                }
                                                options={optionsWarehouse}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Select
                                                name="itemName"
                                                value={this.state.itemName}
                                                label="Nhập tên hàng"
                                                onChange={this.handleChange}
                                                error={this.state.errorItem}
                                                options={optionsItem}
                                            />
                                        </Grid>
                                        {/* <Grid item xs={12}>
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
                                        </Grid> */}
                                    </Grid>
                                    <Button
                                        disabled={Boolean(
                                            isRequesting ||
                                                this.state.errorWarehouse
                                        )}
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}>
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
                            )}
                        </Formik>
                    </div>
                </div>
            </Container>
        )
    }
}

export default withStyles(styles)(AddOrder)
