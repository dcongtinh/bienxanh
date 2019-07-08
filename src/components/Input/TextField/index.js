import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import FormHelperText from '@material-ui/core/FormHelperText'

export default class TextFieldCustomized extends Component {
    render() {
        let {
            onChange,
            onBlur,
            label,
            name,
            value,
            type,
            error,
            helperText
        } = this.props
        return (
            <>
                <TextField
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    name={name}
                    autoComplete={name}
                    variant="outlined"
                    required
                    fullWidth
                    id={name}
                    label={label}
                    error={error}
                    type={type ? type : 'text'}
                />
                {error && (
                    <FormHelperText error={error}>{helperText}</FormHelperText>
                )}
            </>
        )
    }
}
