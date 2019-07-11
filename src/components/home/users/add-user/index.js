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

import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
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
        margin: theme.spacing(3, 0, 2)
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
                                    firstname,
                                    lastname,
                                    username,
                                    email,
                                    password
                                } = values
                                this.props.register({
                                    firstname,
                                    lastname,
                                    username,
                                    password,
                                    email,
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
                                    <Grid container>
                                        <Grid
                                            item
                                            xs={12}
                                            sm={7}
                                            md={7}
                                            lg={7}
                                            container
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
                                        <Grid item xs={12} sm={5} md={5} lg={5}>
                                            <FormControl component="fieldset">
                                                <FormLabel component="legend">
                                                    Assign responsibility
                                                </FormLabel>
                                                <FormGroup>
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked={true}
                                                                value="gilad"
                                                            />
                                                        }
                                                        label="Gilad Gray"
                                                    />
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox value="jason" />
                                                        }
                                                        label="Jason Killian"
                                                    />
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox value="antoine" />
                                                        }
                                                        label="Antoine Llorca"
                                                    />
                                                </FormGroup>
                                                <FormHelperText>
                                                    Be careful
                                                </FormHelperText>
                                            </FormControl>
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
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            className={classes.submit}>
                                            Đăng kí!
                                            {isRequesting ? (
                                                <CircularProgress
                                                    color="secondary"
                                                    className={
                                                        classes.circularProgress
                                                    }
                                                />
                                            ) : null}
                                        </Button>
                                    </Grid>
                                    {/* <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            
                                            
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <div>Data 1</div>
                                        <div>Data 1</div>
                                    </Grid> */}
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
