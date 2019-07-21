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

const SignUpSchema = Yup.object().shape({
    warehouse: Yup.string().required('* Bắt buộc'),
    warehouseName: Yup.string().required('* Bắt buộc'),
    buyerCode: Yup.string().required('* Bắt buộc'),
    buyerAddress: Yup.string().required('* Bắt buộc'),
    buyerTaxCode: Yup.string().required('* Bắt buộc'),
    buyerLegalName: Yup.string().required('* Bắt buộc')
})

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

let initialValues = {
    warehouse: '',
    warehouseName: '',
    buyerCode: '',
    buyerAddress: '',
    buyerLegalName: '',
    buyerTaxCode: ''
}
class AddWarehouse extends React.Component {
    state = {
        siteAdmin: false
    }
    render() {
        let { classes, isRequesting } = this.props
        return (
            <Container component="main" maxWidth="sm">
                <CssBaseline />
                <div className={classes.paper}>
                    <div className={classes.form}>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={SignUpSchema}
                            onSubmit={(values, { resetForm }) => {
                                let {
                                    warehouse,
                                    warehouseName,
                                    buyerCode,
                                    buyerAddress,
                                    buyerLegalName,
                                    buyerTaxCode
                                } = values
                                this.props.addWarehouse({
                                    warehouse,
                                    warehouseName,
                                    buyerCode,
                                    buyerAddress,
                                    buyerLegalName,
                                    buyerTaxCode,
                                    callback: () => resetForm()
                                })
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
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.warehouse}
                                                name="warehouse"
                                                label="Mã kho"
                                                error={
                                                    errors.warehouse &&
                                                    touched.warehouse
                                                }
                                                message={errors.warehouse}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.buyerCode}
                                                label="Mã khách hàng"
                                                name="buyerCode"
                                                error={
                                                    errors.buyerCode &&
                                                    touched.buyerCode
                                                }
                                                message={errors.buyerCode}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.warehouseName}
                                                label="Tên kho"
                                                name="warehouseName"
                                                error={
                                                    errors.warehouseName &&
                                                    touched.warehouseName
                                                }
                                                message={errors.warehouseName}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.buyerLegalName}
                                                label="Tên đơn vị"
                                                name="buyerLegalName"
                                                error={
                                                    errors.buyerLegalName &&
                                                    touched.buyerLegalName
                                                }
                                                message={errors.buyerLegalName}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.buyerAddress}
                                                label="Địa chỉ"
                                                name="buyerAddress"
                                                error={
                                                    errors.buyerAddress &&
                                                    touched.buyerAddress
                                                }
                                                message={errors.buyerAddress}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.buyerTaxCode}
                                                name="buyerTaxCode"
                                                label="Mã số thuế"
                                                type="buyerTaxCode"
                                                error={
                                                    errors.buyerTaxCode &&
                                                    touched.buyerTaxCode
                                                }
                                                message={errors.buyerTaxCode}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Button
                                        disabled={Boolean(
                                            isRequesting ||
                                                errors.warehouse ||
                                                errors.warehouseName ||
                                                errors.buyerCode ||
                                                errors.buyerLegalName ||
                                                errors.buyerAddress ||
                                                errors.buyerTaxCode
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
                            )}
                        </Formik>
                    </div>
                </div>
            </Container>
        )
    }
}

export default withStyles(styles)(AddWarehouse)
