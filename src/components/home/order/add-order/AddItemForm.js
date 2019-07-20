import React from 'react'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import TextField from 'components/Input/TextField'

import Select from 'components/Input/Select'
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
    },
    groupOrder: {
        position: 'relative',
        margin: theme.spacing(1),
        border: '1px solid ' + theme.palette.border,
        paddingTop: theme.spacing(2) + 'px !important'
    },
    legend: {
        position: 'absolute',
        backgroundColor: 'white',
        top: -8,
        padding: '0 4px'
    }
})
class AddItemForm extends React.Component {
    render() {
        let {
            classes,
            array,
            handleChange,
            handleSelectChange,
            handleBlur,
            values,
            errors,
            touched,
            options,
            states,
            defaultValueItem
        } = this.props
        return (
            <>
                {array.map((item, index) => {
                    return (
                        <Grid
                            key={index}
                            item
                            container
                            spacing={2}
                            className={classes.groupOrder}>
                            <div className={classes.legend}>{`Đơn hàng ${index +
                                1}`}</div>
                            <Grid item xs={12}>
                                <Select
                                    name={`itemName${index}`}
                                    value={
                                        states[`itemName${index}`] ||
                                        defaultValueItem
                                    }
                                    label="Nhập tên hàng"
                                    onChange={handleSelectChange}
                                    options={options}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values[`batchNo${index}`]}
                                    label="Số lô"
                                    name={`batchNo${index}`}
                                    error={
                                        errors[`batchNo${index}`] &&
                                        touched[`batchNo${index}`]
                                    }
                                    message={errors[`batchNo${index}`]}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values[`itemQuantity${index}`]}
                                    label="Số lượng"
                                    name={`itemQuantity${index}`}
                                    error={
                                        errors[`itemQuantity${index}`] &&
                                        touched[`itemQuantity${index}`]
                                    }
                                    message={errors[`itemQuantity${index}`]}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values[`itemPrice${index}`]}
                                    label="Đơn giá"
                                    name={`itemPrice${index}`}
                                    error={
                                        errors[`itemPrice${index}`] &&
                                        touched[`itemPrice${index}`]
                                    }
                                    message={errors[`itemPrice${index}`]}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values[`itemNote${index}`]}
                                    label="Ghi chú"
                                    name={`itemNote${index}`}
                                    error={
                                        errors[`itemNote${index}`] &&
                                        touched[`itemNote${index}`]
                                    }
                                    message={errors[`itemNote${index}`]}
                                    noRequired
                                />
                            </Grid>
                        </Grid>
                    )
                })}
            </>
        )
    }
}
export default withStyles(styles)(AddItemForm)
