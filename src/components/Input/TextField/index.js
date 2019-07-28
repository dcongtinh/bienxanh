import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import FormHelperText from '@material-ui/core/FormHelperText'

export default class TextFieldCustomized extends Component {
    render() {
        let { name, error, message, norequired } = this.props
        return (
            <>
                <TextField
                    {...this.props}
                    autoComplete={name}
                    variant="outlined"
                    required={!norequired}
                    fullWidth
                    id={name}
                />
                {error && (
                    <FormHelperText error={error}>{message}</FormHelperText>
                )}
            </>
        )
    }
}
