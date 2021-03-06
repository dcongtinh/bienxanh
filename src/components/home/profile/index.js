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
import Checkbox from '@material-ui/core/Checkbox'
import SaveIcon from '@material-ui/icons/Save'

const styles = theme => ({
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
    constructor(props) {
        super(props)
        let access = props.user.access
        this.state = {
            siteAdmin: props.user.siteAdmin,
            user: access.indexOf('user') !== -1,
            order: access.indexOf('order') !== -1,
            item: access.indexOf('item') !== -1,
            warehouse: access.indexOf('warehouse') !== -1,
            supplier: access.indexOf('supplier') !== -1
        }
    }

    render() {
        let { classes, user, isRequesting, me } = this.props
        let { siteAdmin } = this.state
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
                            initialValues={{
                                firstname: user.firstname || '',
                                lastname: user.lastname || '',
                                username: user.username || '',
                                email: user.email || ''
                            }}
                            validationSchema={SignUpSchema}
                            onSubmit={values => {
                                let { username, firstname, lastname } = values
                                let list = []
                                accesses.forEach(access => {
                                    let { value } = access
                                    if (this.state[value]) list.push(value)
                                })
                                this.props.updateProfile({
                                    username,
                                    firstname,
                                    lastname,
                                    siteAdmin,
                                    access: list
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
                                                    InputProps={{
                                                        readOnly: true
                                                    }}
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
                                                    InputProps={{
                                                        readOnly: true
                                                    }}
                                                />
                                            </Grid>
                                        </Grid>
                                        {me.access.indexOf('user') !== -1 && (
                                            <Grid
                                                item
                                                lg={4}
                                                md={6}
                                                xl={4}
                                                xs={12}>
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
                                                                        key={
                                                                            index
                                                                        }
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
                                        )}
                                    </Grid>
                                    <Button
                                        disabled={Boolean(
                                            errors.firstname || errors.lastname
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
                            )}
                        </Formik>
                    </div>
                </div>
            </Container>
        )
    }
}

export default withStyles(styles)(Profile)
