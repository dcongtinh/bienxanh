import React, { Component } from 'react'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { withStyles } from '@material-ui/core'

const styles = theme => ({
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
    }
})
class SelectCustomized extends Component {
    constructor(props) {
        super(props)
        this.state = {
            labelWidth: 0
        }
        this.inputLabel = React.createRef()
    }
    componentDidMount() {
        this.setState({ labelWidth: this.inputLabel.current.offsetWidth })
    }
    render() {
        let { labelWidth } = this.state
        let { classes, name, value, label, options, error } = this.props
        return (
            <FormControl
                error={error}
                required
                variant="outlined"
                className={classes.formControl}>
                <InputLabel ref={this.inputLabel} htmlFor="outlined-age-simple">
                    {label}
                </InputLabel>
                <Select
                    value={value}
                    onChange={this.props.onChange}
                    input={
                        <OutlinedInput labelWidth={labelWidth} name={name} />
                    }>
                    {options.map((option, index) => {
                        return (
                            <MenuItem value={option.value} key={index}>
                                {option.label}
                            </MenuItem>
                        )
                    })}
                </Select>
                {error && <FormHelperText>{error}</FormHelperText>}
            </FormControl>
        )
    }
}
export default withStyles(styles)(SelectCustomized)
