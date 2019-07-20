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

const ItemSchema = Yup.object().shape({
    itemNameCode: Yup.string().required('* Bắt buộc'),
    itemName: Yup.string().required('* Bắt buộc')
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
    circularProgress: {
        position: 'absolute',
        width: '24px !important',
        height: '24px !important'
    }
})

class UpdateItem extends React.Component {
    state = {
        siteAdmin: false
    }
    render() {
        let { classes, isRequesting, item } = this.props
        if (!item)
            return (
                <CircularProgress
                    color="secondary"
                    className={classes.circularProgress}
                />
            )
        return (
            <Container component="main" maxWidth="sm">
                <CssBaseline />
                <div className={classes.paper}>
                    <div className={classes.form}>
                        <Formik
                            initialValues={{
                                itemNameCode: item.itemNameCode,
                                itemName: item.itemName
                            }}
                            validationSchema={ItemSchema}
                            onSubmit={(values, { resetForm }) => {
                                let { itemNameCode, itemName } = values
                                this.props.updateItem({
                                    idItem: this.props.match.params.idItem,
                                    itemNameCode,
                                    itemName
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
                                                message={errors.itemNameCode}
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
                                    </Grid>
                                    <Button
                                        disabled={Boolean(
                                            isRequesting ||
                                                errors.itemNameCode ||
                                                errors.itemName
                                        )}
                                        type="submit"
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

export default withStyles(styles)(UpdateItem)
