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
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

const SignUpSchema = Yup.object().shape({
    firstname: Yup.string().required('* Bắt buộc'),
    lastname: Yup.string().required('* Bắt buộc'),
    username: Yup.string()
        .min(6, '* Tên tài khoản chứa ít nhất 6 kí tự')
        .max(50, '* Tên tài khoản chứa tối đa 50 kí tự')
        .required('* Bắt buộc'),
    email: Yup.string()
        .email('* Email không hợp lệ')
        .required('* Bắt buộc'),
    password: Yup.string()
        .min(8, '* Mật khẩu chứa ít nhất 8 kí tự')
        .required('* Bắt buộc'),
    repassword: Yup.string()
        .min(8, '* Mật khẩu chứa ít nhất 8 kí tự')
        .oneOf([Yup.ref('password'), null], '* Mật khẩu không khớp')
        .required('* Bắt buộc')
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
        marginTop: theme.spacing(3)
    },
    submit: {
        margin: theme.spacing(2, 0)
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
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    repassword: ''
}

class AddUserForm extends React.Component {
    state = {
        siteAdmin: false,
        user: false,
        order: false,
        item: false,
        warehouse: false
    }

    render() {
        let { classes, isRequesting } = this.props
        let accesses = [
            { value: 'siteAdmin', label: 'Admin' },
            { value: 'user', label: 'Quản lí nhân viên' },
            { value: 'order', label: 'Quản lí hoá đơn' },
            { value: 'item', label: 'Quản lí hàng hoá' },
            { value: 'warehouse', label: 'Quản lí kho' },
            { value: 'supplier', label: 'Quản lí NCC' }
        ]
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
                                    firstname,
                                    lastname,
                                    username,
                                    email,
                                    password
                                } = values
                                let list = []
                                accesses.forEach(access => {
                                    let { value } = access
                                    if (this.state[value]) list.push(value)
                                })
                                this.props.register({
                                    firstname,
                                    lastname,
                                    username,
                                    password,
                                    email,
                                    siteAdmin: this.state[`siteAdmin`],
                                    access: list,
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
                                    <Grid container spacing={2}>
                                        <Grid
                                            item
                                            container
                                            lg={8}
                                            md={6}
                                            xl={8}
                                            xs={12}
                                            spacing={2}>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.firstname}
                                                    name="firstname"
                                                    label="Họ"
                                                    error={
                                                        errors.firstname &&
                                                        touched.firstname
                                                    }
                                                    message={errors.firstname}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.lastname}
                                                    label="Tên"
                                                    name="lastname"
                                                    error={
                                                        errors.lastname &&
                                                        touched.lastname
                                                    }
                                                    message={errors.lastname}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.username}
                                                    label="Tên tài khoản"
                                                    name="username"
                                                    error={
                                                        errors.username &&
                                                        touched.username
                                                    }
                                                    message={errors.username}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.email}
                                                    label="Địa chỉ Email"
                                                    name="email"
                                                    error={
                                                        errors.email &&
                                                        touched.email
                                                    }
                                                    message={errors.email}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.password}
                                                    name="password"
                                                    label="Mật khẩu"
                                                    type="password"
                                                    error={
                                                        errors.password &&
                                                        touched.password
                                                    }
                                                    message={errors.password}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.repassword}
                                                    name="repassword"
                                                    label="Nhập lại mật khẩu"
                                                    type="password"
                                                    error={
                                                        errors.repassword &&
                                                        touched.repassword
                                                    }
                                                    message={errors.repassword}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid item lg={4} md={6} xl={4} xs={12}>
                                            <FormControl component="fieldset">
                                                <FormLabel component="legend">
                                                    Phân quyền
                                                </FormLabel>
                                                <FormGroup>
                                                    {accesses.map(
                                                        (access, index) => {
                                                            let {
                                                                value,
                                                                label
                                                            } = access
                                                            return (
                                                                <FormControlLabel
                                                                    key={index}
                                                                    control={
                                                                        <Checkbox
                                                                            color="primary"
                                                                            checked={
                                                                                this
                                                                                    .state[
                                                                                    value
                                                                                ]
                                                                            }
                                                                            value={
                                                                                value
                                                                            }
                                                                            onChange={e => {
                                                                                this.setState(
                                                                                    {
                                                                                        [value]:
                                                                                            e
                                                                                                .target
                                                                                                .checked
                                                                                    }
                                                                                )
                                                                            }}
                                                                        />
                                                                    }
                                                                    label={
                                                                        label
                                                                    }
                                                                />
                                                            )
                                                        }
                                                    )}
                                                </FormGroup>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                    <Button
                                        disabled={Boolean(
                                            errors.firstname ||
                                                errors.lastname ||
                                                errors.username ||
                                                errors.email ||
                                                errors.password ||
                                                errors.repassword
                                        )}
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}>
                                        <PersonAddIcon
                                            className={classes.iconSubmit}
                                        />
                                        Đăng kí
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

export default withStyles(styles)(AddUserForm)
