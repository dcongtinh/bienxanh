import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import FormHelperText from '@material-ui/core/FormHelperText'
import Container from '@material-ui/core/Container'
import { Link } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress'
import { withStyles } from '@material-ui/core/styles'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

const SignInSchema = Yup.object().shape({
    username: Yup.string().required('* This field is required'),
    password: Yup.string().required('* This field is required')
})

const styles = theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white
        }
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1)
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

@withStyles(styles)
class LoginForm extends React.Component {
    render() {
        let { classes } = this.props
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Đăng nhập
                    </Typography>
                    <div className={classes.form}>
                        <Formik
                            initialValues={{
                                username: '',
                                password: ''
                            }}
                            validationSchema={SignInSchema}
                            onSubmit={values => {
                                let { username, password } = values
                                this.props.login({ username, password })
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
                                    <TextField
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.username}
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="username"
                                        label="Tên tài khoản"
                                        name="username"
                                        autoComplete="username"
                                        autoFocus
                                        error={
                                            errors.username && touched.username
                                        }
                                    />
                                    <FormHelperText
                                        error={
                                            errors.username && touched.username
                                        }>
                                        {errors.username && touched.username
                                            ? errors.username
                                            : null}
                                    </FormHelperText>
                                    <TextField
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.password}
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Mật khẩu"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        error={
                                            errors.password && touched.password
                                        }
                                    />
                                    <FormHelperText
                                        error={
                                            errors.password && touched.password
                                        }>
                                        {errors.password && touched.password
                                            ? errors.password
                                            : null}
                                    </FormHelperText>
                                    <Button
                                        disabled={Boolean(
                                            this.props.isLoggingIn ||
                                                errors.username ||
                                                errors.password
                                        )}
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}>
                                        Đăng nhập ngay!
                                        {this.props.isLoggingIn ? (
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
                        <Grid container>
                            <Grid item xs>
                                <Link to="/" variant="body2">
                                    Quên mật khẩu?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link to="/auth/register" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </Container>
        )
    }
}

export default LoginForm
