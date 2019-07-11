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

const styles = theme => ({
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

const SignUpSchema = Yup.object().shape({
    firstname: Yup.string().required('* Bắt buộc'),
    lastname: Yup.string().required('* Bắt buộc'),
    username: Yup.string()
        .min(6, '* Tên tài khoản chứa ít nhất 6 kí tự')
        .max(50, '* Tên tài khoản chứa tối đa 50 kí tự')
        .required('* Bắt buộc'),
    email: Yup.string()
        .email('* Email không hợp lệ')
        .required('* Bắt buộc')
})

class Profile extends React.Component {
    render() {
        let { classes, user, isRequesting } = this.props
        if (!user)
            return (
                <CircularProgress
                    color="secondary"
                    className={classes.circularProgress}
                />
            )
        return (
            <Container component="main" maxWidth="xs">
                <div className={classes.paper}>
                    <div className={classes.form}>
                        <Formik
                            initialValues={{
                                firstname: user.firstname || '',
                                lastname: user.lastname || '',
                                username: user.username || '',
                                email: user.email || ''
                            }}
                            validationSchema={SignUpSchema}
                            onSubmit={values => {
                                let { username, firstname, lastname } = values
                                this.props.updateProfile({
                                    username,
                                    firstname,
                                    lastname
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
                                                disabled
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
                                                disabled
                                            />
                                        </Grid>
                                    </Grid>
                                    <Button
                                        disabled={Boolean(
                                            errors.firstname || errors.lastname
                                        )}
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}>
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
                            )}
                        </Formik>
                    </div>
                </div>
            </Container>
        )
    }
}

export default withStyles(styles)(Profile)
