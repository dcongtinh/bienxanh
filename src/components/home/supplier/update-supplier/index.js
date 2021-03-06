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
import SaveIcon from '@material-ui/icons/Save'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'

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

class UpdateSupplier extends React.Component {
    state = { data: this.props.supplier.supplierItems }
    render() {
        let { data } = this.state
        let { classes, isRequesting, items, supplier } = this.props
        let { idSupplier } = this.props.match.params
        let initialValues = {
            supplierCode: supplier.supplierCode,
            supplierName: supplier.supplierName,
            supplierIdNo: supplier.supplierIdNo,
            supplierAddress: supplier.supplierAddress,
            supplierNote: supplier.supplierNote
        }
        let AddOrderSchema = Yup.object().shape({
            supplierCode: Yup.string().required('* Bắt buộc'),
            supplierName: Yup.string().required('* Bắt buộc'),
            supplierIdNo: Yup.string().required('* Bắt buộc'),
            supplierAddress: Yup.string().required('* Bắt buộc'),
            supplierNote: Yup.string()
        })
        let optionsItem = []
        items.forEach(item => {
            optionsItem.push({
                value: item._id,
                label: item.itemName
            })
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
                                let {
                                    supplierCode,
                                    supplierName,
                                    supplierIdNo,
                                    supplierAddress,
                                    supplierNote
                                } = values
                                this.props.updateSupplier({
                                    idSupplier,
                                    data: {
                                        supplierCode,
                                        supplierName,
                                        supplierIdNo,
                                        supplierAddress,
                                        supplierNote,
                                        supplierItems: data
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
                                            <Grid item xs={12} sm={4}>
                                                <TextField
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.supplierCode}
                                                    name="supplierCode"
                                                    label="Mã"
                                                    error={
                                                        errors.supplierCode &&
                                                        touched.supplierCode
                                                    }
                                                    message={
                                                        errors.supplierCode
                                                    }
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={8}>
                                                <TextField
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.supplierName}
                                                    name="supplierName"
                                                    label="Họ tên"
                                                    error={
                                                        errors.supplierName &&
                                                        touched.supplierName
                                                    }
                                                    message={
                                                        errors.supplierName
                                                    }
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={4}>
                                                <TextField
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.supplierIdNo}
                                                    name="supplierIdNo"
                                                    label="CMND"
                                                    error={
                                                        errors.supplierIdNo &&
                                                        touched.supplierIdNo
                                                    }
                                                    message={
                                                        errors.supplierIdNo
                                                    }
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={8}>
                                                <TextField
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={
                                                        values.supplierAddress
                                                    }
                                                    name="supplierAddress"
                                                    label="Địa chỉ"
                                                    error={
                                                        errors.supplierAddress &&
                                                        touched.supplierAddress
                                                    }
                                                    message={
                                                        errors.supplierAddress
                                                    }
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.supplierNote}
                                                    name="supplierNote"
                                                    label="Ghi chú"
                                                    norequired
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Select
                                                    isMulti={true}
                                                    name="supplierItems"
                                                    value={data}
                                                    onChange={data => {
                                                        this.setState({ data })
                                                    }}
                                                    options={optionsItem}
                                                    closeMenuOnSelect={false}
                                                    className={
                                                        'basic-multi-select'
                                                    }
                                                    classNamePrefix={'select'}
                                                    placeholder="Chọn hàng hoá"
                                                    components={makeAnimated()}
                                                    styles={{
                                                        multiValue: base => ({
                                                            ...base,
                                                            borderRadius: 16
                                                        }),
                                                        option: base => ({
                                                            ...base,
                                                            maxWidth: '100%',
                                                            overflow: 'hidden',
                                                            textOverflow:
                                                                'ellipsis',
                                                            whiteSpace: 'nowrap'
                                                        })
                                                    }}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Button
                                            disabled={Boolean(isRequesting)}
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

export default withStyles(styles)(UpdateSupplier)
